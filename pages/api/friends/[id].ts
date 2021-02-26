import prisma from '../../../lib/prisma';

// DELETE /api/friend/:id
export default async function handle(req, res) {
  const friendId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.friends.delete({
      where: { id: Number(friendId) },
    });
    res.json(post);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
