import prisma from "../config/prisma";


export const addLugar = async (req, res) => {
  try {
    const newUbicacion = req.body;
    const ubicacion = await prisma.lugar.create({
      data: newUbicacion
    })
    res.json(ubicacion)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}
export const getLugaresByEvento = async (req, res) => {
  const { id } = req.params
  console.log(id);
  try {
    const eventos = await prisma.lugar.findMany({
      where: {
        eventoId: Number(id)
      },
      include: {
        horario: true
      }
    })
    res.json(eventos)
  } catch (error) {
    console.log(error)
  }
}