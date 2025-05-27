const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /api/vehicles/types?wheels 2 or 4
router.get('/types', async (req, res) => {
  try {
    const {wheels} = req.query;

    if(!wheels){
      return res.status(400).json({error:'Missing wheels parameter'});
    }

    const types = await prisma.vehicleType.findMany({
      where:{
        wheels:parseInt(wheels)
      }
    });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

// GET /api/vehicles?typeId=1
router.get('/', async (req, res) => {
  const { typeId } = req.query;

  if (!typeId) {
    return res.status(400).json({ error: 'Missing type id in query params' });
  }

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        typeId: parseInt(typeId),
      },
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

module.exports = router;
