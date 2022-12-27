import React from "react";
import Board from "react-trello";

const Kanban = ({
                    data = [], onUpdateStatus = (id, status) => {
    }
                }) => {
    {
        return (
            <div id={"kanban"} className={"h-full"}>
                {data && (
                    <Board
                        hideCardDeleteIcon
                        data={data}
                        draggable
                        onCardMoveAcrossLanes={(
                            fromLaneId,
                            toLaneId,
                            cardId,
                            index,
                        ) => {
                            if (fromLaneId === toLaneId) {
                                return;
                            }
                            onUpdateStatus(cardId, toLaneId);
                        }}
                        onCardClick={(cardId, metadata, laneId) => {
                            console.log(cardId, metadata, laneId);
                        }}
                        style={{
                            backgroundColor: "inherit",
                            height: "81.1vh",
                        }}
                        laneStyle={{
                            width: "24.5%",
                            overflow: "auto",
                            maxHeight: "70vh",
                            backgroundColor: "#f5f5f5",
                        }}
                        cardStyle={{
                            maxWidth: "100%",
                            minWidth: "330px",
                            borderRadius: 8,
                            border: "1px solid #e5e5e5",
                        }}
                        laneDraggable={false}
                    />
                )}
            </div>
        );
    }
};

Kanban.propTypes = {};

export default Kanban;
