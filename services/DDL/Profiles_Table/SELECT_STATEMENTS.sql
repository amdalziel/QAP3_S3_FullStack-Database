-- SELECT statements for Profiles Table 

-- SELECT all profiles: 
SELECT * FROM public."Profiles" \
    ORDER BY id DESC ;


-- SELECT one profile (by id): 
 SELECT id, username, destination, hobbies \
	FROM public."Profiles" \
	WHERE id=$1; 