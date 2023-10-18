import TooltipDescription from '../Common/TooltipDescription';

export default function CellActions({ row, actions }) {
	return (
		<ul className="list-inline hstack gap-2 mb-0">
			{actions.map((action, index) => (
				<li
					className="list-inline-item edit"
					title={action.title ?? ''}
					key={`actions-${index}`}
					id={`li-tooltip-${index}`}
				>
					<i
						className={action.iconClass}
						onClick={() => action.click(row)}
					/>
					<TooltipDescription
						text={action.labelTooltip}
						id={`li-tooltip-${index}`}
					/>
				</li>
			))}
		</ul>
	);
}
