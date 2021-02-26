import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req, res) {
  const userId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.user.delete({
      where: { id: Number(userId) },
    });
    res.json(post);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
