import React from 'react';

const CourseDetailTable = (props) => {
  const isEmpty = props.dataList.length <= 0;

  const renderItems = props.dataList.map(item => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>
        <button
          onClick={() => {
            props.onDelete(item._id);
          }}
        >
          Verwijderen
        </button>
      </td>
    </tr>
  ));

  const renderTable = !isEmpty ? (
    <table>
      <thead>
        <tr>
          <th>Opdrachtnaam</th>
          <th>Verwijderen</th>
        </tr>
      </thead>
      <tbody>{renderItems}</tbody>
    </table>
  ) : (
    <h1>Geen opdrachten gevonden!</h1>
  );

  return <div className="assignment-overview">{renderTable}</div>;
};

export default CourseDetailTable;
