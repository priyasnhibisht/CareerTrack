import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import ApplicationFormModal from '../components/ApplicationFormModal';
import ApplicationTable from '../components/ApplicationTable';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { STATUS_OPTIONS } from '../constants';
import api from '../lib/api';

function normalizeApplication(app) {
  return {
    id: app.id,
    companyName: app.companyName ?? app.company_name ?? '',
    position: app.position ?? '',
    status: app.status ?? 'applied',
    opportunityType: app.opportunityType ?? app.opportunity_type ?? '',
    appliedDate: (app.appliedDate ?? app.applied_date ?? '').slice(0, 10),
    salaryMin: app.salaryMin ?? app.salary_min ?? '',
    salaryMax: app.salaryMax ?? app.salary_max ?? '',
    applicationSource: app.applicationSource ?? app.application_source ?? '',
    stageReached: app.stageReached ?? app.stage_reached ?? '',
    learningNotes: app.learningNotes ?? app.learning_notes ?? '',
  };
}

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/applications');
      setApplications((res.data.applications || []).map(normalizeApplication));
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const q = search.toLowerCase().trim();
    return applications.filter((item) => {
      const statusMatch = statusFilter === 'all' || item.status === statusFilter;
      const searchMatch =
        !q ||
        item.companyName.toLowerCase().includes(q) ||
        item.position.toLowerCase().includes(q) ||
        item.applicationSource.toLowerCase().includes(q);
      return statusMatch && searchMatch;
    });
  }, [applications, search, statusFilter]);

  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter((a) => a.status === 'applied').length;
    const interviews = applications.filter((a) => a.status === 'interview').length;
    const offers = applications.filter((a) => a.status === 'offer').length;
    return { total, applied, interviews, offers };
  }, [applications]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (application) => {
    setEditing(application);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const saveApplication = async (payload) => {
    setSubmitting(true);
    try {
      const cleaned = {
        ...payload,
        salaryMin: payload.salaryMin ? Number(payload.salaryMin) : null,
        salaryMax: payload.salaryMax ? Number(payload.salaryMax) : null,
      };
      if (editing?.id) {
        await api.put(`/api/applications/${editing.id}`, cleaned);
      } else {
        await api.post('/api/applications', cleaned);
      }
      closeModal();
      await loadApplications();
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to save application');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await api.delete(`/api/applications/${id}`);
      await loadApplications();
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to delete application');
    }
  };

  return (
    <Layout title="Dashboard" subtitle="Track progress, stay organized, and keep momentum.">
      {stats.total >= 10 ? (
        <section className="celebration">
          <strong>Milestone unlocked:</strong> You tracked {stats.total} applications. Keep going.
        </section>
      ) : null}

      <section className="stats-grid">
        <StatCard label="Total Applications" value={stats.total} />
        <StatCard label="Applied" value={stats.applied} tone="applied" />
        <StatCard label="Interviews" value={stats.interviews} tone="interview" />
        <StatCard label="Offers" value={stats.offers} tone="offer" />
      </section>

      <section className="panel">
        <div className="panel-head">
          <h3>Applications</h3>
          <button className="btn" onClick={openCreate}>
            Add Application
          </button>
        </div>
        <div className="filters">
          <input placeholder="Search company, role, source" value={search} onChange={(event) => setSearch(event.target.value)} />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {loading ? <p>Loading applications...</p> : null}
        {error ? <p className="error">{error}</p> : null}
        {!loading ? (
          <ApplicationTable applications={filteredApplications} onEdit={openEdit} onDelete={deleteApplication} />
        ) : null}
      </section>

      <ApplicationFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={saveApplication}
        initialData={editing}
        submitting={submitting}
      />
    </Layout>
  );
}
