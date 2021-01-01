import prisma from '../../../lib/prisma'


// DELETE /api/post/:id
export default async function handle(req, res) {
  const mealId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.meal.delete({
      where: { id: Number(mealId) },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
