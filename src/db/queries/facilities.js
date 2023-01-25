module.exports = {
    GET_REMAINING_SPOTS:
        `
        WITH
        needed AS
            (SELECT f.facility_name, j.nurse_type_needed, sum(j.total_number_nurses_needed) AS total
            FROM facilities AS f INNER JOIN jobs AS j ON (f.facility_id = j.facility_id)
            GROUP BY f.facility_id, j.nurse_type_needed
            ORDER BY f.facility_id, j.nurse_type_needed),
        hired AS 
            (SELECT f.facility_name, j.nurse_type_needed, count(h.nurse_id) AS "hired"
            FROM jobs AS j
            INNER JOIN facilities AS f ON (f.facility_id = j.facility_id)
            LEFT JOIN nurse_hired_jobs AS h ON (j.job_id = h.job_id) 
            GROUP BY 1, 2)
        SELECT n.facility_name, n.nurse_type_needed, sum(total) - sum(hired) AS remaining_spots
        FROM needed AS n
        LEFT JOIN hired AS h ON (n.facility_name = h.facility_name and n.nurse_type_needed = h.nurse_type_needed)
        GROUP BY 1, 2
        ORDER BY 1, 2`,
}