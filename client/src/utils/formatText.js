export const formatText = (texto = "") => {
    if (!texto) return "";
  
    let formateado = texto.replace(/<br\s*\/?>/g, "\n");
  
    formateado = formateado.replace(/\n+/g, "\n");
  
    formateado = formateado.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  
    return formateado;
  };
  