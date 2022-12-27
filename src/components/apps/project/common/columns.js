export const columns = [
    {
        title: "STT",
        dataIndex: "index",
    },
    {
        title: "Mã dự án",
        dataIndex: "code",
    },
    {
        title: "Tên dự án",
        dataIndex: "name",
        sorter: {}
    },
    {
        title: "Người quản trị",
        dataIndex: "manager",
    },
    {
        title: "Tham gia",
        dataIndex: "participates",
    },
    {
        title: "Tiến độ",
        dataIndex: "progress",
    },
    {
        title: "Bắt đầu",
        dataIndex: "startDate",
        sorter: {}
    },
    {
        title: "Kết thúc",
        dataIndex: "endDate",
    },
    {
        dataIndex: "action",
        width: "10%",
    },
];

export const columnPhase = [
    {
        title: "STT",
        dataIndex: "index",
        width: '5%'
    },
    {
        title: "Tên giai đoạn",
        dataIndex: "name",
    },
    {
        title: "Quản trị",
        dataIndex: "manages",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        width: '8%',
        align: 'center'
    },
    {
        title: "Tiến độ",
        dataIndex: "progress",
    },
    {
        title: "Ngày bắt đầu",
        dataIndex: "startDate",
        sorter: {}
    },
    {
        title: "Ngày kết thúc",
        dataIndex: "endDate",
    },
    {
        dataIndex: "action",
        width: "10%",
    }
]
