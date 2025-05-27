const express = require('express');
const router = express.Router();

const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// POST api/bookings

router.post('/',async(req,res)=>{
    const {firstName,lastName,vehicleId,startDate,endDate} = req.body;

    if(!firstName || !lastName || !vehicleId || !startDate || !endDate ){ // we can add validation to check if user provides valid date
        return res.status(400).json({error:"Missing parameters"});
    }

    try{
       const overlappingBookings = await prisma.booking.findFirst({
        where: {
            vehicleId: vehicleId, 
            NOT: {
            OR: [
                {
                endDate: {
                    lte: new Date(startDate), 
                },
                },
                {
                startDate: {
                    gte: new Date(endDate), 
                },
                },
            ],
            },
        },
        });

        if(overlappingBookings){
            return res.status(400).json({error:"Vehicle is already booked for the selected date range "})
            // we can potentially add the end date of booked vehicle for better clarity of consumer
        }

        const newBooking = await prisma.booking.create({
            data:{
                firstName,
                lastName,
                vehicleId: parseInt(vehicleId),
                startDate : new Date(startDate),
                endDate : new Date(endDate)
            }
        });

        res.status(201).json(newBooking); // we can potentially add new messages here as well
    }catch(exception){
        // we can log the error here for furthur debugging  
        return res.status(400).json({error:"Failed to create booking"});
    }
}) ;
module.exports = router;