import { useState } from 'react';
import AiProposalPanel from './AiProposalPanel';

const categoryClassMap = {
    '電気的特性': 'category-electrical',
    '環境条件': 'category-environment',
    '機械的特性': 'category-mechanical',
    '実装条件': 'category-mounting',
    '信頼性': 'category-reliability',
    '規制対応': 'category-regulation',
    '品質・管理': 'category-quality',
};

function CheckItemRow({ item, result, onUpdate }) {
    const [expanded, setExpanded] = useState(false);

    if (!result) return null;

    const categoryClass = categoryClassMap[item.category] || 'category-electrical';

    return (
        <div className="check-item-row">
            <div className="check-item-main" onClick={() => setExpanded(!expanded)}>
                <div className="check-item-no">{item.id}</div>
                <div className={`check-item-category ${categoryClass}`}>
                    {item.category}
                </div>
                <div className="check-item-name">{item.item}</div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {result.finalJudgment !== 'ng' && result.page ? `p.${result.page}` : '-'}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span className={`judgment-badge judgment-${result.aiJudgment}`}>
                        {result.aiJudgment === 'ok' ? '○' : '×'}
                    </span>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <span
                        className={`judgment-badge judgment-${result.finalJudgment}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            const newJudgment = result.finalJudgment === 'ok' ? 'ng' : 'ok';
                            onUpdate({
                                finalJudgment: newJudgment,
                                manualInput: true,
                                selectedProposalIndex: -1
                            });
                        }}
                        style={{ cursor: 'pointer' }}
                        title="クリックして判定を変更"
                    >
                        {result.finalJudgment === 'ok' ? '○' : '×'}
                    </span>
                </div>
                <div className="human-status">
                    <span
                        className={`human-badge ${result.humanReviewed ? 'reviewed' : 'pending'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onUpdate({ humanReviewed: !result.humanReviewed });
                        }}
                        style={{ cursor: 'pointer' }}
                        title="クリックして状態を切り替え"
                    >
                        {result.humanReviewed ? '✓' : '—'}
                    </span>
                </div>
            </div>

            {expanded && (
                <AiProposalPanel
                    item={item}
                    result={result}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
}

export default CheckItemRow;
