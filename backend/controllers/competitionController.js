const Competition = require('../models/competition');
const { cloudinary } = require('../config/cloudinary');

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

    const fileUrl = req.file.path;
    const publicId = getPublicIdFromUrl(fileUrl); 

    const newCompetition = new Competition({
      ownerId,
      category,
      rating: 0,
      ownerEmail,
      fileUrl,
      publicId 
    });

    await newCompetition.save();
    
    res.status(201).json({ message: 'Competition created successfully', competition: newCompetition });

  } catch (error) {
    console.error('Error creating competition:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPublicIdFromUrl = (fileUrl) => {
  try {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split('/');
    const uploadIndex = pathParts.findIndex(p => p === 'upload');
    const publicIdWithExt = pathParts.slice(uploadIndex + 1).join('/');

    const partsWithoutVersion = publicIdWithExt.split('/');
    const versionPart = partsWithoutVersion[0]; 
    const rest = partsWithoutVersion.slice(1).join('/');
    const withoutExtension = rest.replace(/\.[^/.]+$/, '')

    return withoutExtension;
  } catch (err) {
    console.error('Failed to extract public_id from URL:', err.message);
    return null;
  }
};


exports.updateRating = async (req, res) => {
  const { competitionId } = req.params;
  const { rating,userId } = req.body;
  
  try {
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    if (competition.ratedBy.includes(userId)) {
      return res.status(400).json({ message: 'User has already rated this competition' });
    }

    competition.rating += rating;
    competition.ratedBy.push(userId);
    await competition.save(); 

    res.status(200).json({ message: 'Score updated successfully', competition });
  } catch (error) {
    console.error('Error updating score:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteCompetition = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const competition = await Competition.findById(competitionId);
    
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    const { publicId } = competition;
    if (publicId) {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log('Cloudinary delete result:', result);
    } else {
      console.warn('No publicId found for competition:', competitionId);
    }

    await Competition.findByIdAndDelete(competitionId);

    res.status(200).json({ message: 'Competition and image deleted successfully' });
  } catch (error) {
    console.error('Error deleting competition:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLeadCompetitionsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const topCompetitions = await Competition.find({ category })
      .sort({ rating: -1 })
      .limit(3)
      .select("fileUrl ownerEmail rating");

    res.status(200).json(topCompetitions);
  } catch (error) {
    console.error("Error fetching top competitions:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserCompetitionsByUserId = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const userCompetitions = await Competition.find({ ownerId: userId })
        res.status(200).json(userCompetitions);

    } catch (error) {
        console.error("Error fetching user competitions:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


