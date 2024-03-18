-- Update Statement for the Profiles table 


-- PUT OPERATION 

-- EXAMPLE ONLY 
UPDATE public."Profiles"
	SET username='amydal', destination='London', hobbies= Array['classical music, hiking']
	WHERE id = 1;


-- SQL PUT Statement: 
-- Note: hobbies ($4) must be passed through as an ARRAY 

UPDATE public."Profiles" 
             SET username= $2, destination= $3, hobbies= $4 
             WHERE id = $1

------------------------------------------------------------------------------------------



-- PATCH OPERATION: 
-- Note: addition to hobbies ($2) must be passed through as an ARRAY 

UPDATE public."Profiles" 
    SET hobbies = hobbies || $2  
    WHERE id = $1;







