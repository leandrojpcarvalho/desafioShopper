SELECT *
FROM reviews as R
WHERE
    driver_id = ?
ORDER BY rating DESC
LIMIT 0, 1;