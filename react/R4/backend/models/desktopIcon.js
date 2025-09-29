// models/desktopIcon.js
import mongoose from "mongoose";

const desktopIconSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  type: { 
    type: String, 
    required: true,
    enum: ['about', 'projects', 'skills', 'contact', 'custom']
  },
  icon: { 
    type: String, 
    required: true 
  },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  order: { 
    type: Number, 
    default: 0 
  },
  isVisible: { 
    type: Boolean, 
    default: true 
  },
  windowConfig: {
    width: { type: Number, default: 400 },
    height: { type: Number, default: 300 }
  }
}, { 
  timestamps: true 
});

export default mongoose.model("DesktopIcon", desktopIconSchema);