type Chronicle = {
    id: string;
    name: string;
    email: string;
    location: string | null;
    cm_id: string;
    parent_id: string;
    avatar: string;
    avatar_route: string;
    genres: ChronicleGenresList[];
    created_at: string;
    updated_at: string;
};

type ChronicleGenreValue =
    | 'vampire'
    | 'anarch'
    | 'camarilla'
    | 'giovanni'
    | 'independent'
    | 'sabbat'
    | 'clan-specific'
    | 'changeling'
    | 'seelie'
    | 'unseelie'
    | 'changing-breeds'
    | 'garou'
    | 'hengeyokai'
    | 'cb_other'
    | 'demon'
    | 'hunter'
    | 'keui-jin'
    | 'mage'
    | 'traditions'
    | 'technocracy'
    | 'wraith'
    | 'other';
type ChronicleGenresList = {
    name: string;
    value: ChronicleGenreValue;
    children: {
        name: string;
        value: ChronicleGenreValue;
    }[];
};

type ChronicleGenreSelected =
    | ChangeEvent<HTMLInputElement>
    | (Event & { target: { value: ChronicleGenreValue[]; name: string } });

type ChronicleRegionList = { name: ChronicleRegions; value: string };
type ChronicleRegionValues =
    | 'central-and-west-brazil'
    | 'great-lakes'
    | 'international'
    | 'mid-atlantic'
    | 'mississippi-valley'
    | 'new-york-and-new-england'
    | 'northeast-brazil'
    | 'northern-california'
    | 'southeast'
    | 'southeast-brazil'
    | 'southern-brazil'
    | 'southern-ca-and-southwest';

type ChronicleTypesList =
    | {
          name: 'In Person';
          value: 'in-person';
      }
    | {
          name: 'Virtual';
          value: 'virtual';
      }
    | {
          name: 'Hybrid';
          value: 'hybrid';
      };
