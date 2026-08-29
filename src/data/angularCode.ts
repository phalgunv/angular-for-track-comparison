export const INITIAL_ITEMS = [
  {
    id: 'item-alpha',
    name: 'Item Alpha (Core Engine)',
    category: 'Backend',
    initials: 'IA',
    color: 'indigo',
    badge: 'v2.4.0',
    timestamp: '10:00 AM'
  },
  {
    id: 'item-beta',
    name: 'Item Beta (Auth Microservice)',
    category: 'Security',
    initials: 'IB',
    color: 'emerald',
    badge: 'v1.8.2',
    timestamp: '10:15 AM'
  },
  {
    id: 'item-gamma',
    name: 'Item Gamma (Payment Gateway)',
    category: 'Billing',
    initials: 'IG',
    color: 'amber',
    badge: 'v3.1.0',
    timestamp: '10:30 AM'
  },
  {
    id: 'item-delta',
    name: 'Item Delta (Analytics Pipeline)',
    category: 'Data',
    initials: 'ID',
    color: 'rose',
    badge: 'v1.0.4',
    timestamp: '10:45 AM'
  }
];

export const ANGULAR_21_COMPONENT_CODE = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed
} from '@angular/core';

export interface WorkItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  timestamp: string;
}

@Component({
  selector: 'app-track-comparison-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="demo-container">
      <header class="demo-header">
        <div class="badge-pill">Angular 21 Control Flow Audit</div>
        <h1>@for Tracking Benchmark: $index vs item.id</h1>
        <p class="subtitle">
          Demonstration of DOM state retention and uncontrolled input bugs
          introduced by automated migration schematics.
        </p>

        <!-- Reactive Controls powered by Angular Signals -->
        <div class="action-toolbar">
          <button
            type="button"
            class="btn btn-primary"
            (click)="addItemToTop()">
            <span class="icon">➕</span> Add Item to Top (Prepend)
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            (click)="shuffleItems()">
            <span class="icon">🔀</span> Random Shuffle
          </button>
          <button
            type="button"
            class="btn btn-outline"
            (click)="resetItems()">
            <span class="icon">🔄</span> Reset List
          </button>
        </div>

        <div class="instruction-box">
          <strong>Testing Protocol:</strong>
          <ol>
            <li>Type personal notes into the input field for <em>"Item Alpha"</em>.</li>
            <li>Click <strong>"Add Item to Top"</strong>.</li>
            <li>Observe how <code>track $index</code> leaves your typed text on the new item at index 0, while <code>track item.id</code> stays bound to <em>"Item Alpha"</em>.</li>
          </ol>
        </div>
      </header>

      <!-- Side-by-Side Visual Comparison Grid -->
      <main class="grid-columns">
        
        <!-- FLAGGED: track $index -->
        <section class="column-card column-danger">
          <div class="column-header">
            <div class="column-tag danger-tag">⚠️ Migration Schematic Fallback</div>
            <h2>@for (item of items(); track $index)</h2>
            <p class="column-desc">
              Angular tracks views by numeric slot index (0, 1, 2...). When prepending,
              DOM nodes are recycled in place. Uncontrolled DOM states (inputs, focus,
              video players, CSS animations) remain at index 0 instead of moving with data!
            </p>
          </div>

          <div class="list-container">
            @for (item of items(); track $index; let idx = $index; let count = $count) {
              <article class="item-row item-row-danger">
                <div class="row-meta">
                  <span class="index-badge">Index: {{ idx }} / {{ count }}</span>
                  <span class="dom-tag">DOM Slot #{{ idx }}</span>
                  <span class="id-tag">ID: {{ item.id }}</span>
                </div>
                
                <div class="item-body">
                  <div class="item-info">
                    <span class="item-title">{{ item.name }}</span>
                    <span class="category-pill">{{ item.category }}</span>
                  </div>

                  <!-- Uncontrolled input element exposes DOM recycling flaws -->
                  <div class="input-group">
                    <label [for]="'flawed-input-' + idx">Local Note (Uncontrolled DOM State):</label>
                    <input
                      [id]="'flawed-input-' + idx"
                      type="text"
                      placeholder="Type note for {{ item.name }}..."
                      class="form-control text-input" />
                  </div>
                </div>

                <div class="slot-warning">
                  Slot {{ idx }} bound to array index {{ idx }}
                </div>
              </article>
            } @empty {
              <div class="empty-state">No items in array.</div>
            }
          </div>
        </section>

        <!-- RECOMMENDED: track item.id -->
        <section class="column-card column-success">
          <div class="column-header">
            <div class="column-tag success-tag">✅ Enterprise Best Practice</div>
            <h2>@for (item of items(); track item.id)</h2>
            <p class="column-desc">
              Angular tracks views by unique entity identity. When items are prepended
              or shuffled, the exact physical DOM subtree moves with the object identity,
              guaranteeing 100% state integrity and zero input leakage.
            </p>
          </div>

          <div class="list-container">
            @for (item of items(); track item.id; let idx = $index; let count = $count) {
              <article class="item-row item-row-success">
                <div class="row-meta">
                  <span class="index-badge">Index: {{ idx }} / {{ count }}</span>
                  <span class="dom-tag success-dom">Identity Bound</span>
                  <span class="id-tag">ID: {{ item.id }}</span>
                </div>

                <div class="item-body">
                  <div class="item-info">
                    <span class="item-title">{{ item.name }}</span>
                    <span class="category-pill">{{ item.category }}</span>
                  </div>

                  <!-- Uncontrolled input element stays permanently attached to item.id -->
                  <div class="input-group">
                    <label [for]="'stable-input-' + item.id">Local Note (Preserved Identity):</label>
                    <input
                      [id]="'stable-input-' + item.id"
                      type="text"
                      placeholder="Type note for {{ item.name }}..."
                      class="form-control text-input" />
                  </div>
                </div>

                <div class="slot-success">
                  DOM node identity securely mapped to '{{ item.id }}'
                </div>
              </article>
            } @empty {
              <div class="empty-state">No items in array.</div>
            }
          </div>
        </section>

      </main>
    </div>
  \`,
  styles: [\`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background-color: #f8fafc;
      min-height: 100vh;
      padding: 2rem 1.5rem;
      box-sizing: border-box;
    }

    .demo-container {
      max-width: 1280px;
      margin: 0 auto;
    }

    .demo-header {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.75rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .badge-pill {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: #eff6ff;
      color: #2563eb;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      margin-bottom: 0.75rem;
    }

    h1 {
      font-size: 1.75rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 0.5rem 0;
      line-height: 1.25;
    }

    .subtitle {
      font-size: 0.95rem;
      color: #64748b;
      margin: 0 0 1.25rem 0;
      line-height: 1.5;
    }

    .action-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.625rem 1.25rem;
      border-radius: 8px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
    }

    .btn-primary {
      background-color: #2563eb;
      color: #ffffff;
    }
    .btn-primary:hover {
      background-color: #1d4ed8;
    }

    .btn-secondary {
      background-color: #f1f5f9;
      color: #334155;
      border-color: #cbd5e1;
    }
    .btn-secondary:hover {
      background-color: #e2e8f0;
    }

    .btn-outline {
      background-color: #ffffff;
      color: #64748b;
      border-color: #e2e8f0;
    }
    .btn-outline:hover {
      background-color: #f8fafc;
      color: #0f172a;
    }

    .instruction-box {
      background-color: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 0.875rem 1.25rem;
      border-radius: 4px 8px 8px 4px;
      font-size: 0.875rem;
      color: #334155;
    }
    .instruction-box ol {
      margin: 0.5rem 0 0 1.25rem;
      padding: 0;
    }
    .instruction-box li {
      margin-bottom: 0.25rem;
    }

    /* Grid Layout */
    .grid-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.5rem;
      align-items: start;
    }

    .column-card {
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .column-danger {
      border-top: 4px solid #ef4444;
    }
    .column-success {
      border-top: 4px solid #10b981;
    }

    .column-header {
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f1f5f9;
    }

    .column-tag {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      margin-bottom: 0.5rem;
    }
    .danger-tag {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }
    .success-tag {
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }

    .column-header h2 {
      font-size: 1.15rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      margin: 0 0 0.5rem 0;
      color: #0f172a;
    }

    .column-desc {
      font-size: 0.8125rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    .list-container {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }

    .item-row {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      transition: all 0.2s ease;
    }

    .item-row-danger {
      border-left: 3px solid #f87171;
    }
    .item-row-success {
      border-left: 3px solid #34d399;
    }

    .row-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      font-size: 0.75rem;
    }

    .index-badge {
      background: #f1f5f9;
      color: #475569;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      font-weight: 600;
    }

    .dom-tag {
      background: #fee2e2;
      color: #991b1b;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      font-weight: 600;
    }
    .success-dom {
      background: #d1fae5;
      color: #065f46;
    }

    .id-tag {
      color: #94a3b8;
      font-family: ui-monospace, monospace;
      margin-left: auto;
    }

    .item-body {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .item-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .item-title {
      font-weight: 600;
      font-size: 0.9375rem;
      color: #0f172a;
    }

    .category-pill {
      font-size: 0.7rem;
      background: #f1f5f9;
      color: #475569;
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      font-weight: 500;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .input-group label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #475569;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }
    .form-control:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .slot-warning {
      margin-top: 0.5rem;
      font-size: 0.7rem;
      color: #dc2626;
      font-style: italic;
    }

    .slot-success {
      margin-top: 0.5rem;
      font-size: 0.7rem;
      color: #059669;
      font-weight: 500;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #94a3b8;
      font-size: 0.875rem;
    }
  \`]
})
export class TrackComparisonDemoComponent {
  // Reactive Array State managed strictly via Angular Signals
  readonly items = signal<WorkItem[]>([
    {
      id: 'item-alpha',
      name: 'Item Alpha (Core Engine)',
      category: 'Backend',
      badge: 'v2.4.0',
      timestamp: '10:00 AM'
    },
    {
      id: 'item-beta',
      name: 'Item Beta (Auth Microservice)',
      category: 'Security',
      badge: 'v1.8.2',
      timestamp: '10:15 AM'
    },
    {
      id: 'item-gamma',
      name: 'Item Gamma (Payment Gateway)',
      category: 'Billing',
      badge: 'v3.1.0',
      timestamp: '10:30 AM'
    },
    {
      id: 'item-delta',
      name: 'Item Delta (Analytics Pipeline)',
      category: 'Data',
      badge: 'v1.0.4',
      timestamp: '10:45 AM'
    }
  ]);

  private counter = 1;

  /**
   * Prepend a new item to the top of the signal array.
   * This is the definitive test case that exposes the track $index state bug.
   */
  addItemToTop(): void {
    const newItem: WorkItem = {
      id: \`item-new-\${Date.now()}\`,
      name: \`Item New \${this.counter++} (New Service)\`,
      category: 'Ingress',
      badge: 'v1.0.0',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Immutable update using Angular Signals
    this.items.update((current) => [newItem, ...current]);
  }

  /**
   * Randomly shuffles the array in place and commits via Signal update.
   */
  shuffleItems(): void {
    this.items.update((current) => {
      const cloned = [...current];
      for (let i = cloned.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
      }
      return cloned;
    });
  }

  /**
   * Resets the signal state back to the original 4 baseline items.
   */
  resetItems(): void {
    this.counter = 1;
    this.items.set([
      {
        id: 'item-alpha',
        name: 'Item Alpha (Core Engine)',
        category: 'Backend',
        badge: 'v2.4.0',
        timestamp: '10:00 AM'
      },
      {
        id: 'item-beta',
        name: 'Item Beta (Auth Microservice)',
        category: 'Security',
        badge: 'v1.8.2',
        timestamp: '10:15 AM'
      },
      {
        id: 'item-gamma',
        name: 'Item Gamma (Payment Gateway)',
        category: 'Billing',
        badge: 'v3.1.0',
        timestamp: '10:30 AM'
      },
      {
        id: 'item-delta',
        name: 'Item Delta (Analytics Pipeline)',
        category: 'Data',
        badge: 'v1.0.4',
        timestamp: '10:45 AM'
      }
    ]);
  }
}
`;
