const express = require("express");
const router = express.Router();
const {
  getRequests,
  addRequest,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestsControllers");

router.get("/", getRequests);
router.post("/", addRequest);
router.put("/:name", updateRequest);
router.delete("/:name", deleteRequest);

module.exports = router;
