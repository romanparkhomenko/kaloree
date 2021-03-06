import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req, res) {
  const weightId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.weight.delete({
      where: { id: Number(weightId) },
    });
    res.json(post);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
