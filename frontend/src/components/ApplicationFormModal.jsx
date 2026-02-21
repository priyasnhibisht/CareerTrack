import { useEffect, useMemo, useState } from 'react';
import { OPPORTUNITY_TYPES, SOURCE_OPTIONS, STATUS_OPTIONS } from '../constants';

const initialValues = {
  companyName: '',
  position: '',
  status: 'applied',
  opportunityType: '',
  appliedDate: '',
  salaryMin: '',
  salaryMax: '',
  applicationSource: '',
  stageReached: '',
  learningNotes: '',
};

export default function ApplicationFormModal({ open, onClose, onSubmit, initialData, submitting }) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (!open) return;
    setValues(initialData || initialValues);
  }, [open, initialData]);

  const modalTitle = useMemo(() => (initialData?.id ? 'Edit Application' : 'Add Application'), [initialData]);

  if (!open) return null;

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="modal" onClick={(event) => event.stopPropagation()}>
        <h3>{modalTitle}</h3>
        <form className="form-grid" onSubmit={submit}>
          <label>
            Company Name
            <input name="companyName" value={values.companyName} onChange={onChange} required />
          </label>
          <label>
            Position
            <input name="position" value={values.position} onChange={onChange} required />
          </label>
          <label>
            Status
            <select name="status" value={values.status} onChange={onChange} required>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Opportunity Type
            <select name="opportunityType" value={values.opportunityType} onChange={onChange}>
              <option value="">Select</option>
              {OPPORTUNITY_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Applied Date
            <input type="date" name="appliedDate" value={values.appliedDate} onChange={onChange} required />
          </label>
          <label>
            Salary Min
            <input type="number" name="salaryMin" value={values.salaryMin} onChange={onChange} />
          </label>
          <label>
            Salary Max
            <input type="number" name="salaryMax" value={values.salaryMax} onChange={onChange} />
          </label>
          <label>
            Source
            <select name="applicationSource" value={values.applicationSource} onChange={onChange}>
              <option value="">Select</option>
              {SOURCE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Stage Reached
            <input name="stageReached" value={values.stageReached} onChange={onChange} />
          </label>
          <label className="full-width">
            Learning Notes
            <textarea name="learningNotes" value={values.learningNotes} onChange={onChange} rows={4} />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
