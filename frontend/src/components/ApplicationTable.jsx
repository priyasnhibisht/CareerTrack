function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString();
}

export default function ApplicationTable({ applications, onEdit, onDelete }) {
  if (!applications.length) {
    return <p className="empty">No applications yet. Add your first one.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Source</th>
            <th>Applied</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((item) => (
            <tr key={item.id}>
              <td>{item.companyName}</td>
              <td>{item.position}</td>
              <td>
                <span className={`status ${item.status}`}>{item.status}</span>
              </td>
              <td>{item.applicationSource || '-'}</td>
              <td>{formatDate(item.appliedDate)}</td>
              <td className="row-actions">
                <button className="btn btn-secondary" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
