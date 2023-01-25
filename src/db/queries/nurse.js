module.exports = {
    GET_JOBS_AVAILABILITY:
        `
        WITH
        needed AS (SELECT f.facility_name, j.nurse_type_needed, j.job_id, sum(j.total_number_nurses_needed) AS total
            FROM facilities AS f INNER JOIN jobs AS j on (f.facility_id = j.facility_id)
            GROUP by 1, 2, 3
            ORDER by 1, 2),
        hired AS (SELECT f.facility_name, j.nurse_type_needed, j.job_id, count(h.nurse_id) AS "hired"
             FROM jobs AS j
             INNER JOIN facilities AS f on (f.facility_id = j.facility_id)
             LEFT JOIN nurse_hired_jobs AS h on (j.job_id = h.job_id) 
             GROUP by 1, 2, 3),
        available AS (SELECT n.facility_name, n.nurse_type_needed, n.job_id, sum(total) - sum(hired) AS remaining_spots
            FROM needed n
            LEFT JOIN hired h on (n.facility_name = h.facility_name and n.nurse_type_needed = h.nurse_type_needed)
            GROUP by 1, 2, 3
            ORDER by 1, 2
        )
        SELECT n.*, sum(a.remaining_spots) AS available_jobs
        FROM nurses n
        LEFT JOIN available a on (a.nurse_type_needed = n.nurse_type)
        LEFT JOIN nurse_hired_jobs h on (h.nurse_id = n.nurse_id and a.job_id = h.job_id)
        WHERE h.job_id is null
        GROUP by 1, 2, 3`,
    GET_COWORKERS:
        `WITH
        working_facility AS
            (SELECT f.facility_id
            FROM nurse_hired_jobs AS h
            LEFT JOIN jobs AS j on (j.job_id = h.job_id)
            LEFT JOIN facilities AS f on (f.facility_id = j.facility_id)
            WHERE h.nurse_id = $1
            GROUP by 1),
        nurses_facilities AS
            (SELECT h.nurse_id, f.facility_id
            FROM nurse_hired_jobs AS h
            LEFT JOIN jobs AS j on (j.job_id = h.job_id)
            LEFT JOIN facilities AS f on (f.facility_id = j.facility_id)
            GROUP by 1, 2)
        SELECT n.nurse_name
        FROM nurses AS n
        INNER JOIN nurses_facilities AS nf on (nf.nurse_id = n.nurse_id)
        INNER JOIN working_facility AS w on (w.facility_id = nf.facility_id)
        WHERE n.nurse_id != $2
        GROUP by 1`,
}