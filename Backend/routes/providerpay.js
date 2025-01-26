const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const PaymentDetails = require('../Models/paymentModel');

router.post("/", async (req, res) => {
  const { providerId, upiId, bankAccountNumber, ifscCode, accountHolderName } = req.body;

  console.log("Received data:", req.body); // Log received data for debugging

  if (!providerId || !upiId || !bankAccountNumber || !ifscCode || !accountHolderName) {
    console.log("Missing fields:", { providerId, upiId, bankAccountNumber, ifscCode, accountHolderName });
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const validProviderId = new mongoose.Types.ObjectId(providerId); // Correct usage with 'new'
    const existingDetails = await PaymentDetails.findOne({ providerId: validProviderId });

    if (existingDetails) {
      existingDetails.upiId = upiId;
      existingDetails.bankAccountNumber = bankAccountNumber;
      existingDetails.ifscCode = ifscCode;
      existingDetails.accountHolderName = accountHolderName;
      await existingDetails.save();
    } else {
      const paymentDetails = new PaymentDetails({
        providerId: validProviderId,
        upiId,
        bankAccountNumber,
        ifscCode,
        accountHolderName,
      });
      await paymentDetails.save();
    }

    res.status(200).json({ message: "Payment details saved successfully." });
  } catch (error) {
    console.error("Error saving payment details:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
