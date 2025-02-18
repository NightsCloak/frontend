type AuditLog = {
    id: string;
    event: string;
    subject_id: string | null;
    subject_type: string | null;
    causer_id: string | null;
    causer_type: string | null;
    referenced_id: string | null;
    referenced_type: string | null;
    properties: object | null;
    created_at: string;
    updated_at: string;
    subject?: Auditable | null;
    causer?: Auditable | null;
    referenced?: Auditable | null;
};

type Auditable =
    | AiTexture
    | AnnotationComment
    | AnnotationModel
    | AssetCollection
    | AssetExport
    | AssetModel
    | AssetMove
    | AssetPresentation
    | AssetSave
    | AssetVersionModel
    | Copy
    | Download
    | EnvironmentTexture
    | Guest
    | IntractPlugin
    | NotificationChannel
    | Organization
    | OrganizationMember
    | Project
    | ProjectMedia
    | Review
    | ReviewComment
    | RobloxAvatarDeck
    | Tag
    | Texture
    | User
    | UserAssetCollection
    | UserAssetExport
    | UserAssetSave
    | UserTexture
    | VideoConversion;
