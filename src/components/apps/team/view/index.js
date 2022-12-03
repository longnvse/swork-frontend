import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTeam } from "../../../../api/team";
import SWDescription from "../../../common/description";
import ProjectViewResource from "../../project/view/tabs/Resource";
import ResourceList from "../../resource/list";
import { viewTeamFirstColumns, viewTeamSecondColumns } from "./columns";

const TeamView = () => {
    const { id } = useParams();
    const [teamData, setTeamData] = useState({});

    const formatActive = (isActive) => {
        if (isActive) {
            return "Đang hoạt động";
        } else {
            return "Không hoạt động";
        }
    };

    const checkRedirectParent = (data) => {
        if (data?.phaseId && data?.projectId) {
            return (
                <Link to={`/project/view-phase/${data?.phaseId}`}>
                    {data?.phaseName}
                </Link>
            );
        } else {
            return (
                <Link to={`/project/view/${data?.projectId}`}>
                    {data?.projectName}
                </Link>
            );
        }
    };

    const mapData = (data) => {
        return {
            firstColumn: {
                name: data?.name,
                admins: data?.admins?.map((admin, index) => {
                    return <span key={index}>{admin?.memberName}</span>;
                }),
                members: data?.members?.map((member, index) => {
                    return <span key={index}>{member?.memberName}</span>;
                }),
                quantityMembers: data?.admins?.length + data?.members?.length,
            },
            secondColumn: {
                parent: checkRedirectParent(data),
                isActive: formatActive(data?.isActive),
                description: data?.description,
            },
            ...data,
        };
    };

    useEffect(() => {
        if (id) {
            getTeam(id).then((response) => {
                setTeamData(mapData(response?.data));
            });
        }
    }, [id]);

    return (
        <>
            <h3 className="mb-3">Thông tin chung</h3>
            <Row gutter={12}>
                <Col span={12}>
                    <SWDescription
                        span={1}
                        columns={viewTeamFirstColumns}
                        dataSource={teamData?.firstColumn}
                    />
                </Col>
                <Col span={12}>
                    <SWDescription
                        span={1}
                        columns={viewTeamSecondColumns}
                        dataSource={teamData?.secondColumn}
                    />
                </Col>
            </Row>
            <div className="mt-3">
                <h3 className="mb-3">Tài nguyên</h3>
                <ResourceList
                    resourceData={teamData?.resources}
                    teamId={id || teamData?.id}
                />
            </div>
        </>
    );
};

export default TeamView;
