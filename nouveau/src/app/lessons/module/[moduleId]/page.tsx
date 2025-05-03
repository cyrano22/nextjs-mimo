"use client";

import React, { useState, useEffect } from "react";

export default function ModulePage({
  params,
}: {
  params: { moduleId: string };
}) {
  const [module, setModule] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/modules/${params.moduleId}`)
      .then((res) => res.json())
      .then((data) => setModule(data))
      .catch((err) => console.error(err));
  }, [params.moduleId]);

  return (
    <div className="module-container">
      <h1 className="module-title">{module?.title || "Chargement..."}</h1>
      <p className="module-description">
        {module?.description || "Chargement de la description..."}
      </p>
    </div>
  );
}
