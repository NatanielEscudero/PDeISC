import { useEffect, useState } from "react";
import api from "../services/api";

export default function DesktopIcons({ onOpenWindow }) {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIcons = async () => {
    try {
      const response = await api.get("/components");
      const activeIcons = response.data.filter(comp => comp.isActive && comp.icon);
      setIcons(activeIcons);
    } catch (error) {
      console.error("Error fetching icons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  const handleIconClick = (icon) => {
    onOpenWindow({
      id: icon._id,
      title: icon.title,
      type: icon.type,
      content: icon.content,
      data: icon.data,
      config: icon.windowConfig
    });
  };

  if (loading) return null;

  return (
    <div className="desktop-icons">
      {icons.map(icon => (
        <div
          key={icon._id}
          className="desktop-icon"
          onClick={() => handleIconClick(icon)}
        >
          <div className="icon-image">
            <span className="text-4xl">{icon.icon}</span>
          </div>
          <span>{icon.title}</span>
        </div>
      ))}
    </div>
  );
}

