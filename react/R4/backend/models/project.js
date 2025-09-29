import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  technologies: { 
    type: String, 
    required: true,
    trim: true
  },
  githubUrl: { 
    type: String, 
    trim: true 
  },
  demoUrl: { 
    type: String, 
    trim: true 
  },
  image: { 
    type: String, 
    trim: true 
  },
  category: {
    type: String,
    default: "web",
    enum: ["web", "mobile", "desktop", "other"]
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

export default mongoose.model("Project", projectSchema);