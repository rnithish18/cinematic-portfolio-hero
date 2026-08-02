import styles from "./Contact.module.css";
import MagneticButton from "@/components/MagneticButton";

const icons = {
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.28-1.38a9.9 9.9 0 004.71 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.79 14.02c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.14-4.88-4.33-.14-.19-1.17-1.56-1.17-2.98s.75-2.11 1.02-2.4c.26-.28.58-.35.77-.35.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.28-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.9.91.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
    </svg>
  ),
  telegram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
      <path d="M22 3.5L2.6 11.2c-1.3.5-1.3 1.2-.2 1.6l4.9 1.5 1.9 5.8c.2.6.4.8.9.8.4 0 .6-.2.8-.4l2.3-2.2 4.8 3.5c.7.4 1.2.2 1.4-.7l3.5-16.4c.3-1.2-.4-1.7-1.9-1.2zM8.5 13.9L17 8.4c.4-.2.7-.1.4.2l-7.1 6.4-.3 3-1.3-3.4z" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
    </svg>
  ),
};

type Channel = {
  label: string;
  value: string;
  href: string | null;
  icon: string;
  note?: string;
};

const channels: Channel[] = [
  { label: "WhatsApp", value: "+91 7845074566", href: "https://wa.me/917845074566", icon: "whatsapp" },
  { label: "Telegram", value: "+91 7845074566", href: "https://t.me/+917845074566", icon: "telegram" },
  { label: "Email", value: "rnithish18122006@gmail.com", href: "mailto:rnithish18122006@gmail.com", icon: "email" },
  { label: "LinkedIn", value: "r-nithish-181206n", href: "https://www.linkedin.com/in/r-nithish-181206n/", icon: "linkedin" },
  { label: "Location", value: "Namakkal, Tamil Nadu, India", href: null, icon: "location" },
];

const minorChannels: Channel[] = [
  { label: "Email 2", value: "rnithish181206@gmail.com", href: "mailto:rnithish181206@gmail.com", icon: "email" },
  { label: "Instagram", value: "@nithish_r007", href: "https://www.instagram.com/nithish_r007/", icon: "instagram" },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glow1} />

      <div className={styles.container}>
        <div className={styles.photoWrap}>
          <img src="/contact-photo.jpg" alt="Nithish R" className={styles.photo} />
          <div className={styles.photoOverlay} />
          <div className={styles.photoTag}>
            <span className={styles.photoTagStatus}>
              <span className={styles.dot} /> Available for work
            </span>
            <div className={styles.photoName}>Nithish R</div>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>REACH OUT</span>
          <h2 className={styles.title}>
            Get In <span className={styles.titleAccent}>Touch</span>
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind or just want to say hi? Pick whichever way
            works best for you.
          </p>

          <div className={styles.list}>
            {channels.map((c) => {
              const Wrapper = c.href ? "a" : "div";
              const row = (
                <Wrapper
                  key={c.label}
                  {...(c.href ? { href: c.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={styles.row}
                >
                  <div className={styles.rowLeft}>
                    <div className={`${styles.iconBadge} ${styles[c.icon]}`}>
                      {icons[c.icon as keyof typeof icons]}
                    </div>
                    <div className={styles.textCol}>
                      <span className={styles.rowLabel}>{c.label}</span>
                      <span className={styles.rowValue}>{c.value}</span>
                    </div>
                  </div>
                  {c.href && <span className={styles.arrow}>→</span>}
                </Wrapper>
              );

              // Only apply the magnetic pull to clickable rows (skip Location, which has no link)
              return c.href ? (
                <MagneticButton key={c.label} className={styles.magneticWrap} strength={0.08}>
                  {row}
                </MagneticButton>
              ) : (
                row
              );
            })}

            {minorChannels.map((c) => (
              <MagneticButton key={c.label} className={styles.magneticWrap} strength={0.08}>
                <a
                  href={c.href === null ? undefined : c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.row} ${styles.minorRow}`}
                >
                  <div className={styles.rowLeft}>
                    <div className={`${styles.iconBadge} ${styles[c.icon]}`}>
                      {icons[c.icon as keyof typeof icons]}
                    </div>
                    <div className={styles.textCol}>
                      <span className={styles.rowLabel}>
                        {c.label} {c.note && <span className={styles.note}>({c.note})</span>}
                      </span>
                      <span className={styles.rowValue}>{c.value}</span>
                    </div>
                  </div>
                  <span className={styles.arrow}>→</span>
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}