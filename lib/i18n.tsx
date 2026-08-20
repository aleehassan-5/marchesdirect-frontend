"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, { fr: string; en: string }>;

export const dict: Dict = {
  // Header / nav
  nav_tenders: { fr: "Appels d'offres", en: "Tenders" },
  nav_public: { fr: "Marches publics", en: "Public procurement" },
  nav_subcontract: { fr: "Sous-traitance", en: "Subcontracting" },
  nav_pricing: { fr: "Tarifs", en: "Pricing" },
  nav_dashboard: { fr: "Tableau de bord", en: "Dashboard" },
  nav_login: { fr: "Connexion", en: "Log in" },
  nav_trial: { fr: "Essai gratuit", en: "Free trial" },
  nav_menu_open: { fr: "Ouvrir le menu", en: "Open menu" },
  nav_menu_close: { fr: "Fermer le menu", en: "Close menu" },

  // Footer
  footer_legal: { fr: "Mentions legales", en: "Legal notice" },
  footer_privacy: { fr: "Confidentialite", en: "Privacy" },
  footer_terms: { fr: "CGU", en: "Terms" },
  footer_contact: { fr: "Contact", en: "Contact" },

  // Homepage
  home_eyebrow: { fr: "3 flux d'opportunites &middot; une seule plateforme", en: "3 opportunity streams &middot; one platform" },
  home_title_1: { fr: "Ne cherchez plus vos", en: "Stop chasing your" },
  home_title_gold: { fr: "appels d'offres.", en: "tenders." },
  home_title_2: { fr: "On vous les apporte.", en: "We bring them to you." },
  home_subtitle: {
    fr: "Marches publics, appels d'offres prives et sous-traitance BTP &mdash; classes et recommandes automatiquement selon votre metier, votre rayon d'action et vos disponibilites.",
    en: "Public procurement, private tenders and construction subcontracting &mdash; automatically classified and recommended based on your trade, working radius and availability.",
  },
  home_choose_title: { fr: "Choisissez votre entree", en: "Choose your entry point" },
  home_choose_sub: {
    fr: "Chaque flux ouvre une experience adaptee &mdash; filtres pre-configures, vocabulaire du metier, priorites differentes. Vous pourrez en activer plusieurs a la fois depuis votre tableau de bord.",
    en: "Each stream opens a tailored experience &mdash; pre-configured filters, trade-specific vocabulary, different priorities. You can activate several at once from your dashboard.",
  },
  home_explore: { fr: "Explorer", en: "Explore" },

  // Journeys (structural copy, not source data)
  journey_tenders_tag: { fr: "Marches prives", en: "Private tenders" },
  journey_tenders_desc: {
    fr: "Promoteurs, bailleurs et grandes entreprises. Contact direct et reactivite avant tout.",
    en: "Developers, property managers and large companies. Direct contact and responsiveness above all.",
  },
  journey_public_tag: { fr: "BOAMP - PLACE - JOUE", en: "BOAMP - PLACE - JOUE" },
  journey_public_desc: {
    fr: "Mairies, Etat, collectivites. Conformite, pieces du DCE et memoire technique generes pour vous.",
    en: "Town councils, government, local authorities. Compliance, tender documents and technical memo generated for you.",
  },
  journey_sub_tag: { fr: "Entre entreprises", en: "Between companies" },
  journey_sub_desc: {
    fr: "Lots a reprendre entre entreprises du batiment. Rapidite et disponibilite en priorite.",
    en: "Work packages to take over between construction companies. Speed and availability first.",
  },

  // Search bar
  search_trade: { fr: "Metier", en: "Trade" },
  search_trade_all: { fr: "Tous les metiers", en: "All trades" },
  search_location: { fr: "Localisation", en: "Location" },
  search_location_placeholder: { fr: "Ville, departement...", en: "City, region..." },
  search_radius: { fr: "Rayon", en: "Radius" },
  search_radius_national: { fr: "National", en: "Nationwide" },
  search_submit: { fr: "Voir mes opportunites", en: "View my opportunities" },
  search_sort_relevance: { fr: "Tri : pertinence", en: "Sort: relevance" },
  search_sort_deadline: { fr: "Tri : echeance", en: "Sort: deadline" },
  search_sort_distance: { fr: "Tri : distance", en: "Sort: distance" },
  search_results: { fr: "resultats", en: "results" },

  // Stats
  stat_sources: { fr: "sources connectees en continu", en: "sources connected continuously" },
  stat_frequency: { fr: "frequence de collecte par source", en: "collection frequency per source" },
  stat_accuracy: { fr: "seuil de precision exige du chatbot IA", en: "required AI chatbot accuracy" },
  stat_invented: { fr: "donnee inventee - tout est source", en: "invented data - everything is sourced" },

  // How it works
  how_title: { fr: "Comment ca marche", en: "How it works" },
  how_sub: { fr: "Du reperage de l'opportunite jusqu'au dossier de reponse pret a deposer.", en: "From spotting the opportunity to a bid package ready to submit." },
  how_1_title: { fr: "On surveille", en: "We monitor" },
  how_1_body: {
    fr: "Nos connecteurs collectent en continu BOAMP, PLACE, JOUE et des dizaines d'autres sources, publiques et privees.",
    en: "Our connectors continuously collect BOAMP, PLACE, JOUE and dozens of other sources, public and private.",
  },
  how_2_title: { fr: "On trie et on classe", en: "We sort and classify" },
  how_2_body: {
    fr: "L'IA classe chaque opportunite par metier, code CPV, distance et montant. Ce qui manque est signale, jamais invente.",
    en: "AI classifies every opportunity by trade, CPV code, distance and value. Missing data is flagged, never invented.",
  },
  how_3_title: { fr: "Vous repondez", en: "You respond" },
  how_3_body: {
    fr: "Dossier genere depuis votre profil entreprise : DC1, DC2, memoire technique, bordereau de prix - a valider avant envoi.",
    en: "Bid package generated from your company profile: DC1, DC2, technical memo, pricing schedule - to validate before sending.",
  },

  // CTA
  cta_title: { fr: "Votre prochain chantier est peut-etre deja publie quelque part.", en: "Your next project may already be published somewhere." },
  cta_sub: { fr: "Creez votre profil entreprise une fois. On s'occupe de le faire matcher partout.", en: "Set up your company profile once. We match it everywhere for you." },
  cta_try: { fr: "Essayer gratuitement", en: "Try for free" },
  cta_callback: { fr: "Etre rappele", en: "Request a callback" },

  // Journey listing page
  journey_filter_trade: { fr: "Tous les metiers", en: "All trades" },
  journey_filter_radius: { fr: "Rayon : 50 km", en: "Radius: 50 km" },
  journey_filter_radius_100: { fr: "Rayon : 100 km", en: "Radius: 100 km" },

  // Listing card
  listing_status_analyzed: { fr: "Analyse", en: "Analyzed" },
  listing_status_pending: { fr: "Non analyse", en: "Not analyzed" },
  listing_deadline: { fr: "Echeance", en: "Deadline" },
  listing_match: { fr: "de correspondance", en: "match" },

  // Listing detail page
  detail_budget: { fr: "Budget estime", en: "Estimated budget" },
  detail_deadline: { fr: "Echeance", en: "Deadline" },
  detail_trade: { fr: "Metier", en: "Trade" },
  detail_cpv: { fr: "Code CPV", en: "CPV code" },
  detail_match: { fr: "Correspondance", en: "Match" },
  detail_ai_summary: { fr: "Resume IA", en: "AI summary" },
  detail_ai_analyzed: {
    fr: "Cette opportunite correspond a votre metier declare ({trade}) et se situe dans votre rayon d'action ({distance} km). Les criteres de selection et les documents requis seront extraits automatiquement des pieces du dossier des qu'elles seront disponibles. Toute information absente de la source sera signalee ici comme &laquo;&nbsp;non disponible&nbsp;&raquo;, jamais devinee.",
    en: "This opportunity matches your declared trade ({trade}) and falls within your working radius ({distance} km). Selection criteria and required documents will be extracted automatically from the tender files once available. Any information missing from the source will be flagged here as &laquo;&nbsp;not available&nbsp;&raquo;, never invented.",
  },
  detail_ai_pending: { fr: "Analyse IA non encore disponible pour cette opportunite.", en: "AI analysis is not yet available for this opportunity." },
  detail_documents: { fr: "Documents du marche", en: "Tender documents" },
  detail_doc_rc: { fr: "Reglement de consultation (RC)", en: "Consultation rules (RC)" },
  detail_doc_cctp: { fr: "CCTP", en: "CCTP" },
  detail_doc_bpu: { fr: "DPGF / BPU", en: "DPGF / BPU" },
  detail_doc_selected: { fr: "documents selectionnes", en: "documents selected" },
  detail_doc_download: { fr: "Telecharger", en: "Download" },
  detail_step_dossier: { fr: "Dossier", en: "Dossier" },
  detail_step_analysis: { fr: "Analyse", en: "Analysis" },
  detail_step_response: { fr: "Reponse", en: "Response" },
  detail_step_sending: { fr: "Envoi", en: "Sending" },
  detail_prep_title: { fr: "Votre preparation", en: "Your preparation" },
  detail_prep_docs: { fr: "Documents consultes", en: "Documents reviewed" },
  detail_prep_todo: { fr: "Elements a completer", en: "Items to complete" },
  detail_prep_deadline: { fr: "Echeance", en: "Deadline" },
  detail_prepare_response: { fr: "Preparer ma reponse", en: "Prepare my response" },
  detail_respond: { fr: "Repondre a cette opportunite", en: "Respond to this opportunity" },
  detail_save: { fr: "Sauvegarder", en: "Save" },
  detail_from_your_hq: { fr: "de votre siege", en: "from your HQ" },

  // Dashboard
  dash_eyebrow: { fr: "Tableau de bord", en: "Dashboard" },
  dash_greeting: { fr: "Bonjour", en: "Hello" },
  dash_my_responses: { fr: "Mes reponses", en: "My responses" },
  dash_complete_profile: { fr: "Completer mon profil", en: "Complete my profile" },
  dash_profile_complete: { fr: "Profil entreprise : {pct}% complet", en: "Company profile: {pct}% complete" },
  dash_profile_hint: {
    fr: "Ajoutez vos attestations d'assurance et vos references pour ameliorer vos correspondances IA.",
    en: "Add your insurance certificates and references to improve your AI matches.",
  },

  // Auth
  login_title: { fr: "Connexion", en: "Log in" },
  login_sub: { fr: "Accedez a vos opportunites et a votre profil entreprise.", en: "Access your opportunities and company profile." },
  login_email: { fr: "Email professionnel", en: "Business email" },
  login_password: { fr: "Mot de passe", en: "Password" },
  login_submit: { fr: "Se connecter", en: "Log in" },
  login_submitting: { fr: "Connexion...", en: "Logging in..." },
  login_no_account: { fr: "Pas encore de compte ?", en: "Don't have an account yet?" },
  login_error_generic: { fr: "Email ou mot de passe incorrect.", en: "Incorrect email or password." },
  nav_logout: { fr: "Se deconnecter", en: "Log out" },

  signup_eyebrow: { fr: "Essai gratuit", en: "Free trial" },
  signup_title: { fr: "Creez votre compte", en: "Create your account" },
  signup_sub: {
    fr: "Configurez votre profil entreprise une fois, recevez des opportunites correspondantes des le premier jour.",
    en: "Set up your company profile once, receive matching opportunities from day one.",
  },
  signup_company: { fr: "Nom de l'entreprise", en: "Company name" },
  signup_trade: { fr: "Metier principal", en: "Main trade" },
  signup_firstname: { fr: "Prenom", en: "First name" },
  signup_lastname: { fr: "Nom", en: "Last name" },
  signup_email: { fr: "Email professionnel", en: "Business email" },
  signup_password: { fr: "Mot de passe", en: "Password" },
  signup_submit: { fr: "Creer mon compte", en: "Create my account" },
  signup_submitting: { fr: "Creation...", en: "Creating..." },
  signup_have_account: { fr: "Deja inscrit ?", en: "Already registered?" },
  signup_error_generic: { fr: "Une erreur est survenue. Veuillez reessayer.", en: "Something went wrong. Please try again." },

  // Pricing
  pricing_eyebrow: { fr: "Tarifs", en: "Pricing" },
  pricing_title: { fr: "Un abonnement, toutes vos opportunites.", en: "One subscription, all your opportunities." },
  pricing_sub: {
    fr: "Commencez gratuitement. Un conseiller vous rappelle pour configurer votre profil et choisir la formule adaptee.",
    en: "Start for free. An advisor will call you back to set up your profile and choose the right plan.",
  },
  pricing_highlight: { fr: "Le plus choisi", en: "Most popular" },

  // Company profile
  profile_eyebrow: { fr: "Saisi une fois, reutilise partout", en: "Enter once, reuse everywhere" },
  profile_title: { fr: "Profil entreprise", en: "Company profile" },
  profile_sub: {
    fr: "Ces informations sont saisies une seule fois puis reutilisees automatiquement pour generer vos dossiers de reponse : DC1, DC2, acte d'engagement, memoire technique et bordereau de prix.",
    en: "This information is entered once and automatically reused to generate your bid packages: DC1, DC2, engagement act, technical memo and pricing schedule.",
  },
  profile_status_complete: { fr: "Complet", en: "Complete" },
  profile_status_todo: { fr: "A completer", en: "To complete" },
  profile_status_missing: { fr: "Incomplet", en: "Incomplete" },
  profile_edit: { fr: "Modifier", en: "Edit" },
  profile_save: { fr: "Enregistrer", en: "Save" },
  profile_cancel: { fr: "Annuler", en: "Cancel" },
  profile_add: { fr: "Ajouter", en: "Add" },
  profile_saving: { fr: "Enregistrement...", en: "Saving..." },
  profile_saved: { fr: "Enregistre", en: "Saved" },
  profile_save_error: { fr: "Erreur lors de l'enregistrement", en: "Error while saving" },
  profile_name: { fr: "Denomination sociale", en: "Company name" },
  profile_siret: { fr: "SIRET", en: "SIRET" },
  profile_legal_form: { fr: "Forme juridique", en: "Legal form" },
  profile_address: { fr: "Adresse", en: "Address" },
  profile_city: { fr: "Ville", en: "City" },
  profile_postal_code: { fr: "Code postal", en: "Postal code" },
  profile_phone: { fr: "Telephone", en: "Phone" },
  profile_employee_count: { fr: "Effectif", en: "Employee count" },
  profile_annual_revenue: { fr: "Chiffre d'affaires annuel (EUR)", en: "Annual revenue (EUR)" },
  profile_founding_year: { fr: "Annee de creation", en: "Founding year" },
  profile_ref_project: { fr: "Nom du projet", en: "Project name" },
  profile_ref_client: { fr: "Client", en: "Client" },
  profile_ref_value: { fr: "Montant (EUR)", en: "Value (EUR)" },
  profile_ref_date: { fr: "Date de fin", en: "Completion date" },
  profile_doc_type: { fr: "Type de document", en: "Document type" },
  profile_doc_url: { fr: "Lien du fichier", en: "File URL" },
  profile_doc_file: { fr: "Fichier", en: "File" },
  profile_doc_choose_file: { fr: "Merci de choisir un fichier.", en: "Please choose a file." },
  profile_doc_expiry: { fr: "Date d'expiration", en: "Expiry date" },
  profile_cert_name: { fr: "Nom de la certification", en: "Certification name" },
  profile_cert_issuer: { fr: "Delivree par", en: "Issued by" },
  profile_no_items: { fr: "Aucun element enregistre.", en: "Nothing saved yet." },
  profile_login_required: { fr: "Connectez-vous pour gerer votre profil entreprise.", en: "Log in to manage your company profile." },
  profile_go_login: { fr: "Se connecter", en: "Log in" },

  // My responses
  bids_eyebrow: { fr: "Suivi", en: "Tracking" },
  bids_title: { fr: "Mes reponses", en: "My responses" },
  bids_sub: { fr: "Statut de chaque dossier : a preparer, en cours, soumis, gagne ou perdu.", en: "Status of each file: to prepare, in progress, submitted, awarded or lost." },
  bid_status_prepare: { fr: "A preparer", en: "To prepare" },
  bid_status_progress: { fr: "En cours", en: "In progress" },
  bid_status_submitted: { fr: "Soumis", en: "Submitted" },
  bid_status_won: { fr: "Gagne", en: "Awarded" },
  bid_status_lost: { fr: "Perdu", en: "Lost" },
  bids_deadline: { fr: "Echeance", en: "Deadline" },

  // Response wizard
  wiz_eyebrow: { fr: "Dossier de reponse", en: "Bid file" },
  wiz_step_dce: { fr: "Analyse du DCE", en: "Tender document analysis" },
  wiz_step_admin: { fr: "Documents administratifs", en: "Administrative documents" },
  wiz_step_memo: { fr: "Memoire technique", en: "Technical memo" },
  wiz_step_pricing: { fr: "Bordereau de prix", en: "Pricing schedule" },
  wiz_step_final: { fr: "Assemblage final", en: "Final assembly" },
  wiz_criteria_title: { fr: "Criteres de selection extraits", en: "Extracted selection criteria" },
  wiz_criteria_sub: { fr: "Extraits automatiquement du RC, du CCAP et du CCTP. A verifier avant soumission.", en: "Automatically extracted from the RC, CCAP and CCTP. To verify before submission." },
  wiz_checklist_title: { fr: "Checklist documents requis", en: "Required documents checklist" },
  wiz_from_profile: { fr: "Disponible - profil", en: "Available - profile" },
  wiz_to_generate: { fr: "A generer", en: "To generate" },
  wiz_admin_title: { fr: "Documents administratifs", en: "Administrative documents" },
  wiz_admin_sub: { fr: "Pre-remplis depuis votre profil entreprise. Montant et conditions a confirmer avant signature.", en: "Pre-filled from your company profile. Amount and conditions to confirm before signature." },
  wiz_preview: { fr: "Previsualiser", en: "Preview" },
  wiz_memo_title: { fr: "Memoire technique - premier brouillon", en: "Technical memo - first draft" },
  wiz_memo_sub: {
    fr: "Genere depuis votre profil entreprise et le CCTP. A relire, corriger et valider - aucune section n'est soumise sans validation humaine.",
    en: "Generated from your company profile and the CCTP. To review, correct and validate - no section is submitted without human validation.",
  },
  wiz_draft_ready: { fr: "Brouillon pret", en: "Draft ready" },
  wiz_pricing_title: { fr: "Bordereau de prix (BPU)", en: "Pricing schedule (BPU)" },
  wiz_pricing_sub: { fr: "Structure generee depuis le modele du dossier. Verification automatique de coherence formelle avant soumission.", en: "Structure generated from the tender template. Automatic consistency check before submission." },
  wiz_col_item: { fr: "Poste", en: "Item" },
  wiz_col_unit: { fr: "Unite", en: "Unit" },
  wiz_col_qty: { fr: "Qte", en: "Qty" },
  wiz_col_price: { fr: "Prix unitaire", en: "Unit price" },
  wiz_final_title: { fr: "Checklist avant soumission", en: "Pre-submission checklist" },
  wiz_final_export: { fr: "Exporter le dossier complet", en: "Export the full package" },
  wiz_final_1: { fr: "Documents administratifs complets", en: "Administrative documents complete" },
  wiz_final_2: { fr: "Memoire technique valide", en: "Technical memo validated" },
  wiz_final_3: { fr: "Bordereau de prix coherent", en: "Pricing schedule consistent" },
  wiz_final_4: { fr: "Signature electronique", en: "Electronic signature" },
  wiz_final_5: { fr: "Format conforme a la plateforme de depot", en: "Format compliant with the submission platform" },
  wiz_prev: { fr: "Precedent", en: "Previous" },
  wiz_next: { fr: "Suivant", en: "Next" },

  // Blog
  blog_eyebrow: { fr: "Guides et actualites", en: "Guides and news" },
  blog_title: { fr: "Blog", en: "Blog" },
  blog_post_eyebrow: { fr: "Guide", en: "Guide" },
  blog_post_body: {
    fr: "Contenu editorial gere depuis le CMS. Cette page demontre la structure de gabarit (titre, date, corps, articles lies) attendue pour le blog et les guides reglementaires.",
    en: "Editorial content managed from the CMS. This page demonstrates the template structure (title, date, body, related articles) expected for the blog and regulatory guides.",
  },

  // SEO landing
  seo_eyebrow: { fr: "Page generee &middot; SEO local", en: "Generated page &middot; Local SEO" },
  seo_title: { fr: "Appels d'offres {trade} a {city}", en: "{trade} tenders in {city}" },
  seo_sub: {
    fr: "Marches publics, appels d'offres prives et lots de sous-traitance pour le metier {trade}, dans un rayon configurable autour de {city}. Mise a jour automatique toutes les 2 a 6 heures selon les sources.",
    en: "Public procurement, private tenders and subcontracting packages for the {trade} trade, within a configurable radius around {city}. Automatically updated every 2 to 6 hours depending on the source.",
  },
  seo_pattern: {
    fr: "Modele d'URL : /opportunites/[metier]/[ville] &middot; genere pour chaque combinaison metier x ville x departement x region x type d'opportunite, pour chacun des trois flux.",
    en: "URL pattern: /opportunites/[trade]/[city] &middot; generated for every trade x city x department x region x opportunity-type combination, for each of the three streams.",
  },

  // Admin
  admin_eyebrow: { fr: "Administration", en: "Administration" },
  admin_title: { fr: "Panneau d'administration", en: "Admin panel" },
  admin_sources_title: { fr: "Etat des connecteurs de sources", en: "Source connector status" },
  admin_last_run: { fr: "Derniere execution", en: "Last run" },
  admin_next_run: { fr: "Prochaine", en: "Next run" },
  admin_analytics_title: { fr: "Analytics par marque", en: "Analytics per brand" },
  admin_backups_title: { fr: "Sauvegardes", en: "Backups" },
  admin_last_backup: { fr: "Derniere sauvegarde testee", en: "Last tested backup" },
  admin_manage_title: { fr: "Gestion", en: "Management" },
  admin_manage_listings: { fr: "Gerer les annonces", en: "Manage listings" },
  admin_manage_accounts: { fr: "Gerer les comptes", en: "Manage accounts" },
  admin_manage_subs: { fr: "Gerer les abonnements", en: "Manage subscriptions" },
  admin_subs_count: { fr: "abonnes", en: "subscribers" },

  // Chatbot
  chat_title: { fr: "Assistant MarchesDirect", en: "MarchesDirect Assistant" },
  chat_tagline: { fr: "Source uniquement &middot; jamais invente", en: "Sourced only &middot; never invented" },
  chat_intro: {
    fr: "Bonjour, je suis l'assistant MarchesDirect. Je reponds uniquement a partir des annonces et documents auxquels vous avez acces, et je cite toujours ma source.",
    en: "Hello, I'm the MarchesDirect assistant. I only answer from the listings and documents you have access to, and I always cite my source.",
  },
  chat_fallback: {
    fr: "Cette information n'est pas encore disponible dans les documents indexes pour votre compte. Je ne peux pas l'inventer - reformulez ou consultez la fiche complete de l'opportunite.",
    en: "This information isn't yet available in the documents indexed for your account. I can't invent it - rephrase your question or check the full listing.",
  },
  chat_placeholder: { fr: "Posez une question sur une annonce...", en: "Ask a question about a listing..." },
  chat_send: { fr: "Envoyer", en: "Send" },
  chat_open: { fr: "Ouvrir l'assistant", en: "Open the assistant" },

  // Bottom navigation (mobile)
  bottomnav_home: { fr: "Accueil", en: "Home" },
  bottomnav_search: { fr: "Recherche", en: "Search" },
  bottomnav_dashboard: { fr: "Tableau de bord", en: "Dashboard" },
  bottomnav_profile: { fr: "Profil", en: "Profile" },

  // Today's actions (dashboard)
  today_title: { fr: "A faire aujourd'hui", en: "To do today" },
  today_sub: { fr: "Vos priorites, triees automatiquement.", en: "Your priorities, sorted automatically." },
  today_deadline_soon: {
    fr: "{count} echeance(s) sous 7 jours",
    en: "{count} deadline(s) within 7 days",
  },
  today_deadline_action: { fr: "Voir les opportunites concernees", en: "View the affected opportunities" },
  today_profile_incomplete: { fr: "Profil entreprise incomplet ({pct}%)", en: "Company profile incomplete ({pct}%)" },
  today_profile_action: { fr: "Completer maintenant", en: "Complete now" },
  today_draft_ready: { fr: "{count} brouillon(s) IA en attente de relecture", en: "{count} AI draft(s) waiting for review" },
  today_draft_action: { fr: "Relire les brouillons", en: "Review the drafts" },
  today_docs_expiring: { fr: "{count} document(s) arrivent a expiration", en: "{count} document(s) expiring soon" },
  today_docs_action: { fr: "Voir les documents", en: "View the documents" },
  today_all_done: { fr: "Tout est a jour. Aucune action urgente.", en: "Everything is up to date. No urgent action." },
  today_priority_high: { fr: "Urgent", en: "Urgent" },
  today_priority_medium: { fr: "A faire", en: "To do" },

  // Document expiry
  doc_expiry_label: { fr: "Validite", en: "Valid until" },
  doc_expiry_valid: { fr: "A jour", en: "Up to date" },
  doc_expiry_soon: { fr: "Expire bientot", en: "Expiring soon" },
  doc_expiry_expired: { fr: "Expire", en: "Expired" },
  doc_expiry_none: { fr: "Pas de date requise", en: "No date required" },

  // AI draft / human review
  ai_draft_badge: { fr: "Brouillon IA", en: "AI draft" },
  ai_review_required: { fr: "Validation humaine requise avant envoi", en: "Human review required before submission" },
  ai_review_done: { fr: "Relu et valide", en: "Reviewed and approved" },

  // Loading / empty / error states
  state_loading: { fr: "Chargement en cours...", en: "Loading..." },
  state_empty_title: { fr: "Aucun resultat", en: "No results" },
  state_empty_sub: {
    fr: "Aucune opportunite ne correspond a ces filtres pour le moment. Essayez d'elargir votre rayon ou de changer de metier.",
    en: "No opportunity matches these filters right now. Try widening your radius or changing trade.",
  },
  state_empty_reset: { fr: "Reinitialiser les filtres", en: "Reset filters" },
  state_error_title: { fr: "Un probleme est survenu", en: "Something went wrong" },
  state_error_sub: {
    fr: "Le chargement des donnees a echoue. Verifiez votre connexion et reessayez.",
    en: "Loading the data failed. Check your connection and try again.",
  },
  state_retry: { fr: "Reessayer", en: "Retry" },

  // Signup onboarding (multi-step)
  onboarding_step_company: { fr: "Entreprise", en: "Company" },
  onboarding_step_location: { fr: "Zone de travail", en: "Working area" },
  onboarding_step_account: { fr: "Compte", en: "Account" },
  onboarding_location_title: { fr: "Ou travaillez-vous ?", en: "Where do you work?" },
  onboarding_location_sub: {
    fr: "Utilise pour ne vous montrer que les opportunites accessibles.",
    en: "Used to only show you opportunities you can reach.",
  },
  onboarding_location: { fr: "Ville du siege", en: "HQ city" },
  onboarding_location_placeholder: { fr: "Ex. Nantes", en: "E.g. Nantes" },
  onboarding_radius: { fr: "Rayon d'intervention", en: "Working radius" },
  onboarding_radius_25: { fr: "25 km", en: "25 km" },
  onboarding_radius_50: { fr: "50 km", en: "50 km" },
  onboarding_radius_100: { fr: "100 km", en: "100 km" },
  onboarding_radius_national: { fr: "National", en: "Nationwide" },
  onboarding_back: { fr: "Retour", en: "Back" },
  onboarding_continue: { fr: "Continuer", en: "Continue" },
  onboarding_step_of: { fr: "Etape {step} sur {total}", en: "Step {step} of {total}" },
};

export function useTranslation() {
  const { lang } = useLanguage();
  return (key: keyof typeof dict, vars?: Record<string, string | number>) => {
    let str = dict[key]?.[lang] ?? key;
    if (vars) {
      for (const k of Object.keys(vars)) {
        str = str.replaceAll(`{${k}}`, String(vars[k]));
      }
    }
    return str;
  };
}

const LanguageContext = createContext<{ lang: Lang; toggle: () => void; setLang: (l: Lang) => void }>({
  lang: "fr",
  toggle: () => {},
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("md-lang") as Lang | null;
    let initial: Lang;
    if (stored === "fr" || stored === "en") {
      // Saved preference always wins, even over the browser language.
      initial = stored;
    } else {
      // No saved preference yet: detect from the browser/client language.
      const browserLangs = window.navigator.languages?.length
        ? window.navigator.languages
        : [window.navigator.language];
      const detected = browserLangs.find((l) => l.toLowerCase().startsWith("fr"))
        ? "fr"
        : browserLangs.find((l) => l.toLowerCase().startsWith("en"))
        ? "en"
        : "fr"; // default to French for this market if neither matches
      initial = detected;
    }
    setLangState(initial);
    document.documentElement.setAttribute("lang", initial);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    document.documentElement.setAttribute("lang", next);
    window.localStorage.setItem("md-lang", next);
  };

  const toggle = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
