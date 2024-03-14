CREATE TABLE public."Profiles"
(
    id serial NOT NULL,
    username character varying(24) NOT NULL,
    destination character varying(32) NOT NULL,
    hobbies character varying(150)[],
    PRIMARY KEY (id),
    CONSTRAINT uq_profiles_username UNIQUE (username),
    CONSTRAINT check_destination_in_list CHECK (
        destination IN ('London', 'Paris', 'Barcelona', 'Dubrovnik', 'Reykjavík', 'Amsterdam', 'Venice', 'Berlin')
    )
);

ALTER TABLE IF EXISTS public."Profiles"
    OWNER to postgres;