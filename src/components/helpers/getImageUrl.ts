export const getImageUrl = (imageName: string) => {
    // Reemplaza "images" con la ruta base donde se almacenan tus imágenes
    return `/public/${imageName}`;
};