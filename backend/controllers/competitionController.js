const Competition = require('../models/competition');

exports.getCompetitionsByCategory = async (req, res) => {
  const { category } = req.params;
  
  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  try {
    const competitions = await Competition.find({ category });
    res.json(competitions);
  } catch (error) {
    console.error('Failed to get competitions by category:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createCompetition = async (req, res) => {
  try {
    const { ownerId, category, ownerEmail } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const newCompetition = new Competition({
      ownerId,
      category,
      rating: 0,
      ownerEmail,
      fileUrl: req.file.path
    });

    await newCompetition.save();
    
    res.status(201).json({ message: 'Competition created successfully', competition: newCompetition });

  } catch (error) {
    console.error('Error creating competition:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
