import moment from "moment";

const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
};

export default handleValidDate;