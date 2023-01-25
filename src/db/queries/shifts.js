module.exports = {
    GET_ALL:
        `SELECT shifts.*, facilities.facility_name
        FROM question_one_shifts AS shifts
        INNER JOIN facilities ON (shifts.facility_id = facilities.facility_id)`,
    GET_SHIFT_BY_ID:
        `SELECT * FROM question_one_shifts AS shifts WHERE shifts.shift_id = $1`,
}