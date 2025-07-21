const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getRequests = async (req, res) => {
  try {
    const requests = await prisma.request.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(requests);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch requests", error: err.message });
  }
};

exports.addRequest = async (req, res) => {
  const { name, city } = req.body;
  try {
    const exists = await prisma.request.findFirst({
      where: { name, NOT: { status: "rejected" } },
    });

    if (exists) return res.status(400).json({ message: "Duplicate entry" });

    const newRequest = await prisma.request.create({ data: { name, city } });
    res.status(201).json(newRequest);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create request", error: err.message });
  }
};

exports.updateRequest = async (req, res) => {
  const { status, eta } = req.body;
  const name = req.params.name;

  try {
    const updated = await prisma.request.updateMany({
      where: { name },
      data: { status, eta },
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update request", error: err.message });
  }
};

exports.deleteRequest = async (req, res) => {
  const name = req.params.name;
  try {
    await prisma.request.deleteMany({ where: { name } });
    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete request", error: err.message });
  }
};
