type ImagePaths = {
    annotationFailed: string;
    annotationFinished: string;
    annotationInProgress: string;
    annotationPending: string;
    blankAlbedoTexture: string;
    darkLogo: string;
    folder: string;
    gridOpacity: string;
    iconLogo: string;
    lightLogo: string;
    minimize: string;
    model: string;
    notFound: string;
    organization: string;
    project: string;
    reticle: string;
    user: string;
};

const imagePaths: ImagePaths = {
    annotationFailed: '/images/annotation_failed.png',
    annotationFinished: '/images/annotation_finished.png',
    annotationInProgress: '/images/annotation_inProgress.png',
    annotationPending: '/images/annotation_pending.png',
    blankAlbedoTexture: '/images/blankIntractAlbedoTexture.png',
    darkLogo: '/images/DarkLogo.png',
    folder: '/images/folder.png',
    gridOpacity: '/images/gridOpacity.png',
    iconLogo: '/images/iconLogo.png',
    lightLogo: '/images/LightLogo.png',
    minimize: '/images/minimize.svg',
    model: '/images/gears.png',
    notFound: '/images/image404.png',
    organization: '/images/organization.png',
    project: '/images/project.png',
    reticle: '/images/reticle.png',
    user: '/images/users.png',
};

export default imagePaths;
