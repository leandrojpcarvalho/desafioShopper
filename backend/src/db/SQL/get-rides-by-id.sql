SELECT R.customer_id, R.origin, R.destination, R.duration, R.distance, R.date, R.value, R.driver_id, D.name, R.id
FROM rides AS R
    INNER JOIN drivers AS D ON R.driver_id = D.id
WHERE
    R.customer_id = ?
ORDER BY R.date DESC;