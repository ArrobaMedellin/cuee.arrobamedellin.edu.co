import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ModalState {
	isTermsModalOpen: boolean
	hasAcceptedTerms: boolean
	openTermsModal: () => void
	closeTermsModal: () => void
	acceptTerms: () => void
}

export const useModalStore = create<ModalState>()(
	persist(
		set => ({
			isTermsModalOpen: false,
			hasAcceptedTerms: false,
			openTermsModal: () => set({ isTermsModalOpen: true }),
			closeTermsModal: () => set({ isTermsModalOpen: false }),
			acceptTerms: () =>
				set({ hasAcceptedTerms: true, isTermsModalOpen: false }),
		}),
		{
			name: 'modal-storage',
			partialize: state => ({ hasAcceptedTerms: state.hasAcceptedTerms }),
		}
	)
)
