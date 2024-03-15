-- Update Statement for the Profiles table 

-- EXAMPLE ONLY 
UPDATE public."Profiles"
	SET username='amydal', destination='London', hobbies= Array['classical music, hiking']
	WHERE id = 1;


-- SQL statement for PATCH operation 

UPDATE public."Profiles"
	SET username= $2, destination= $3, hobbies= Array[$4]
	WHERE id = $1;

