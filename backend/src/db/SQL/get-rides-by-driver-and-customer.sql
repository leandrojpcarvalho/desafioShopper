SELECT rides.customer_id, rides.origin, rides.destination, rides.duration, rides.distance, rides.date, rides.value, rides.driver_id, drivers.name, rides.id
FROM rides
    INNER JOIN drivers ON rides.driver_id = drivers.id
WHERE
    driver_id = ?
    AND customer_id = ?
ORDER BY rides.date DESC;