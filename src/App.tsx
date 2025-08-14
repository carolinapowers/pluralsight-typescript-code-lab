import React, { useState } from 'react';
import { Badge, Button, Card, Input, Modal } from './components';
import { formatCurrency, formatDate, formatNumber, isValidEmail } from './utils';
import styles from './App.module.css';

export const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && !isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>🎨 Design System Showcase</h1>
        <p className={styles.subtitle}>
          A complete TypeScript design system built with barrel file patterns
        </p>
        <div className={styles.headerBadges}>
          <Badge variant="primary">TypeScript</Badge>
          <Badge variant="success">React</Badge>
          <Badge variant="warning">Design System</Badge>
          <Badge variant="secondary">Barrel Files</Badge>
        </div>
      </header>

      <main className={styles.section}>
        {/* Buttons Section */}
        <section className={styles.componentGroup}>
          <h2 className={styles.groupTitle}>Buttons</h2>
          <div className={styles.flexGroup}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className={styles.flexGroup}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Inputs Section */}
        <section className={styles.componentGroup}>
          <h2 className={styles.groupTitle}>Inputs</h2>
          <form className={styles.exampleGrid}>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              errorMessage={emailError}
            />
            <Input type="password" placeholder="Password" />
            <Input placeholder="Disabled input" disabled />
          </form>
        </section>

        {/* Cards Section */}
        <section className={styles.componentGroup}>
          <h2 className={styles.groupTitle}>Cards</h2>
          <div className={styles.exampleGrid}>
            <Card title="Basic Card" subtitle="This is a subtitle">
              <p>
                This is the card content. Cards are great for organizing related
                information.
              </p>
            </Card>

            <Card
              title="Product Card"
              footer={
                <div className={styles.flexGroup}>
                  <Badge variant="success">In Stock</Badge>
                  <div>
                    <span className={styles.priceTag}>
                      {formatCurrency(99.99)}
                    </span>
                    <br />
                    <small>Purchased by {formatNumber(15789)} developers</small>
                  </div>
                </div>
              }
            >
              <p>Premium TypeScript Course</p>
              <p className={styles.cardDescription}>
                Learn advanced patterns and best practices
              </p>
            </Card>

            <Card title="Date Example">
              <p>Today's date: {formatDate(new Date(), 'long')}</p>
              <p>
                Relative:{' '}
                {formatDate(new Date(Date.now() - 86400000), 'relative')}
              </p>
            </Card>
          </div>
        </section>

        {/* Modal Section */}
        <section>
          <h2 className={styles.groupTitle}>Modal</h2>
          <Button fullWidth={false} onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
          >
            <p>This is a modal dialog. You can put any content here.</p>
            <div className={styles.modalActions}>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </Modal>
        </section>

        {/* Badges Section */}
        <section className={styles.componentGroup}>
          <h2 className={styles.groupTitle}>Badges</h2>
          <div className={styles.flexGroup}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
          <div className={styles.flexGroup}>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
          <div className={styles.flexGroup}>
            <Badge dot variant="primary" />
            <Badge dot variant="success" />
            <Badge dot variant="danger" />
            <span>Status indicators</span>
          </div>
        </section>
      </main>
    </div>
  );
};
