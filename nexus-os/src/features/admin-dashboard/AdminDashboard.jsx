/** @format */

import { Link } from "react-router-dom";

import useProjects from "../../hooks/useProjects";
import useRequests from "../../hooks/useRequests";
import useClients from "../../hooks/useClients";
import useDevelopers from "../../hooks/useDevelopers";
import useTotalRevenue from "../../hooks/useTotalRevenue";

import StatCard from "../../ui/StatCard";
import Spinner from "../../ui/Spinner";
import ProjectPieChart from "../../components/ProjectPieChart";

import {
  FaProjectDiagram,
  FaEnvelope,
  FaUsers,
  FaDollarSign,
  FaUser,
  FaCode,
  FaCoins,
  FaArrowRight,
} from "react-icons/fa";

import styles from "./AdminDashboard.module.css";
import { getClientName, getDeveloperName } from "../../../utils/names";

function AdminDashboard() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: requests, isLoading: requestsLoading } = useRequests();
  const { data: clients, isLoading: clientsLoading } = useClients();
  const { data: developers } = useDevelopers();
  const { data: totalRevenue } = useTotalRevenue();

  if (projectsLoading || requestsLoading || clientsLoading) return <Spinner />;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Overview of your agency</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          title="Total Projects"
          value={projects?.length ?? 0}
          icon={FaProjectDiagram}
        />
        <StatCard
          title="Pending Requests"
          value={requests?.length ?? 0}
          icon={FaEnvelope}
        />
        <StatCard
          title="Total Clients"
          value={clients?.length ?? 0}
          icon={FaUsers}
        />
        <StatCard
          title="Total Revenue"
          value={totalRevenue}
          icon={FaDollarSign}
          isCurrency
        />
      </div>

      <ProjectPieChart />

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Projects</h2>
          <Link to="/app/projects" className={styles.viewAll}>
            <span>View all</span>
            <FaArrowRight />
          </Link>
        </div>
        <div className={styles.projectGrid}>
          {projects?.slice(0, 6).map((project) => {
            const clientName = getClientName(clients, project.client_id);
            const developerName = getDeveloperName(
              developers,
              project.developer_id,
            );

            return (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleWrapper}>
                    <h3
                      className={`${styles.cardTitle} ${(project.title || "").length > 40 ? styles.hasTooltip : ""}`}
                      tabIndex={(project.title || "").length > 40 ? 0 : -1}
                    >
                      {project.title}
                    </h3>
                    {(project.title || "").length > 40 && (
                      <div className={styles.tooltip}>{project.title}</div>
                    )}
                  </div>
                  <span className={`${styles.badge} ${styles[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardRow}>
                    <FaUser className={styles.cardIcon} />
                    <span className={styles.cardLabel}>Client</span>
                    <span className={styles.cardValue}>{clientName}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <FaCode className={styles.cardIcon} />
                    <span className={styles.cardLabel}>Developer</span>
                    <span className={styles.cardValue}>{developerName}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <FaCoins className={styles.cardIcon} />
                    <span className={styles.cardLabel}>Budget</span>
                    <span className={styles.cardValue}>
                      {project.budget
                        ? "$" + Number(project.budget).toLocaleString("en-US")
                        : "—"}
                    </span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.progressWrapper}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${project.progress ?? 0}%` }}
                      />
                    </div>
                    <span className={styles.progressText}>
                      {project.progress ?? 0}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
