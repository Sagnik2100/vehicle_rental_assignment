//const {PrismaClient} = require('@prisma/client');
const { PrismaClient } = require('../generated/prisma');


const prisma = new PrismaClient();

async function main(){
    const carTypes = await prisma.vehicleType.createMany({
        data : [
            {name : "Hatchback" , wheels : 4},
             { name: 'SUV', wheels: 4 },
            { name: 'Sedan', wheels: 4 },
            {name : "Cruiser", wheels : 2}
        ]
    });

    const allTypes = await prisma.vehicleType.findMany();

    await prisma.vehicle.createMany(
        {
            data : [
                {name : "Honda Civic",typeId: allTypes.find(t=>t.name === "Sedan").id},
                {name : "Yamaha Cruiser",typeId : allTypes.find(t=>t.name === "Cruiser").id},
                {name : "Tata Punch",typeId : allTypes.find(t=>t.name === "SUV").id}
            ]
        }
    );

    console.log("Seeding Done!!");
}
main().catch(e => console.log(e)).finally(()=>prisma.$disconnect());