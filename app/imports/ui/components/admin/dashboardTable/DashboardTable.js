import React from 'react';
import { Link } from 'react-router-dom';

// import './style.scss';

const DashboardTable = (props) => {
  const renderDifficultyDots = (difficulty) => {
    const dots = [];

    for (let i = 0; i < difficulty; i += 1) {
      dots.push(<div key={i} className="difficulty-dots" />);
    }

    return dots;
  };

  const { dataList } = props;

  const renderTableItems = dataList.map(data => (
    <tr key={data._id}>
      <td className="table__cell">{data.name}</td>
      <td className="table__cell grid--hide-medium">{data.description}</td>
      <td className="table__cell grid--hide-medium">{renderDifficultyDots(data.difficulty)}</td>
      <td className="table__cell">
        <Link className="button button--arrow" to={`/admin/lessen/${data._id}`}/>
      </td>
    </tr>
  ));

  return (
    <table className="dashboard-table table table--admin table--admin--dashboard">
      <thead className="table__header">
        <tr>
          <th className="table__cell--head">Naam</th>
          <th className="table__cell--head grid--hide-medium">Beschrijving</th>
          <th className="table__cell--head grid--hide-medium">Niveau</th>
          <th className="table__cell--head">Bekijk</th>
        </tr>
      </thead>
      <tbody className="table__body">{renderTableItems}</tbody>
    </table>
  );
};

export default DashboardTable;
