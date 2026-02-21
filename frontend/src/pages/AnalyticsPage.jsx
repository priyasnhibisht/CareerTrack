import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from 'recharts';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import api from '../lib/api';

const COLORS = ['#0b6e4f', '#1f9d55', '#38a169', '#68d391', '#9ae6b4'];

export default function AnalyticsPage() {
  const [overview, setOverview] = useState({
    totalApplications: 0,
    applied: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
  });
  const [sources, setSources] = useState([]);
  const [pipeline, setPipeline] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [overviewRes, sourcesRes, pipelineRes, timelineRes] = await Promise.all([
          api.get('/api/analytics/overview'),
          api.get('/api/analytics/sources'),
          api.get('/api/analytics/pipeline'),
          api.get('/api/analytics/timeline'),
        ]);
        setOverview(overviewRes.data.overview || {});
        setSources(sourcesRes.data.sources || []);
        setPipeline(pipelineRes.data.pipeline || []);
        setTimeline(timelineRes.data.timeline || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Unable to load analytics');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const conversionRate = useMemo(() => {
    if (!overview.totalApplications) return '0%';
    return `${Math.round((overview.offers / overview.totalApplications) * 100)}%`;
  }, [overview]);

  return (
    <Layout title="Analytics" subtitle="Measure what is working in your job search.">
      <section className="stats-grid">
        <StatCard label="Total Applications" value={overview.totalApplications ?? 0} />
        <StatCard label="Interviews" value={overview.interviews ?? 0} tone="interview" />
        <StatCard label="Offers" value={overview.offers ?? 0} tone="offer" />
        <StatCard label="Offer Rate" value={conversionRate} />
      </section>

      {loading ? <p>Loading analytics...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      {!loading && !error ? (
        <section className="chart-grid">
          <article className="panel chart-panel">
            <h3>Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Applied', value: overview.applied || 0 },
                    { name: 'Interview', value: overview.interviews || 0 },
                    { name: 'Offer', value: overview.offers || 0 },
                    { name: 'Rejected', value: overview.rejections || 0 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {COLORS.map((color) => (
                    <Cell key={color} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </article>

          <article className="panel chart-panel">
            <h3>Source Performance</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sources}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#0b6e4f" />
                <Bar dataKey="successes" fill="#1f9d55" />
              </BarChart>
            </ResponsiveContainer>
          </article>

          <article className="panel chart-panel">
            <h3>Pipeline</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={pipeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </article>

          <article className="panel chart-panel">
            <h3>Timeline</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#0b6e4f" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </article>
        </section>
      ) : null}
    </Layout>
  );
}
