import type { LucideIcon } from 'lucide-react';

export interface ISideBarNavigationItem {
	icon: LucideIcon;
	label: string;
	link: string;
	isBottomBorder?: boolean;
}
