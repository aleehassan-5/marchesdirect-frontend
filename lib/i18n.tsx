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
  nav_about: { fr: "A propos", en: "About us" },
  nav_team: { fr: "Notre equipe", en: "Our team" },
  nav_how_it_works: { fr: "Comment ca marche", en: "How it works" },
  nav_faq: { fr: "FAQ", en: "FAQ" },
  nav_dashboard: { fr: "Tableau de bord", en: "Dashboard" },
  nav_saved: { fr: "Mes opportunites", en: "Saved" },
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
  home_eyebrow: { fr: "3 flux d'opportunites", en: "3 opportunity streams" },
  home_title_1: { fr: "Votre prochaine opportunite", en: "Your next opportunity" },
  home_hero_desc: {
    fr: "Appels d'offres, marches publics et opportunites de sous-traitance adaptes a votre entreprise.",
    en: "Tenders, public procurement, and subcontracting opportunities matched to your business.",
  },
  home_title_gold: { fr: "appels d'offres.", en: "tenders." },
  home_title_2: { fr: "commence ici.", en: "starts here." },
  home_hero_sub: {
    fr: "Choisissez votre parcours ou echangez avec un conseiller Marches Direct.",
    en: "Choose your path or speak with a Marches Direct advisor.",
  },
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
  journey_sub_toggle_site: { fr: "Je cherche un chantier", en: "I'm looking for a site" },
  journey_sub_toggle_partner: { fr: "Je cherche un partenaire", en: "I'm looking for a partner" },

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
  cta_title: { fr: "Besoin d'aide pour trouver la bonne", en: "Need help finding the right" },
  cta_title_accent: { fr: "opportunite ?", en: "opportunity?" },
  cta_sub: { fr: "Un conseiller Marches Direct vous aide a identifier le parcours adapte a votre entreprise.", en: "A Marches Direct advisor helps you identify the right path for your company." },
  cta_try: { fr: "Essayer gratuitement", en: "Try for free" },
  cta_callback: { fr: "Etre rappele", en: "Request a callback" },

  home_regions_eyebrow: { fr: "Pres de chez vous", en: "Near you" },
  home_regions_title: { fr: "Des opportunites partout en France.", en: "Opportunities all across France." },
  home_regions_sub: { fr: "Explorez les marches par region, departement ou grande ville.", en: "Explore opportunities by region, department or major city." },
  home_regions_tab_regions: { fr: "Regions", en: "Regions" },
  home_regions_tab_departments: { fr: "Departements", en: "Departments" },
  home_regions_tab_cities: { fr: "Villes", en: "Cities" },
  home_regions_see_all: { fr: "Voir toutes les zones", en: "See all zones" },
  home_intl_title: { fr: "Opportunites a l'international", en: "International opportunities" },
  home_intl_sub: { fr: "Accedez egalement aux marches disponibles hors de France.", en: "Also access opportunities available outside France." },

  home_sectors_eyebrow: { fr: "Secteurs d'activite", en: "Sectors" },
  home_sectors_title: { fr: "Des opportunites pour tous les metiers.", en: "Opportunities for every trade." },
  home_sectors_sub: { fr: "Explorez les secteurs et accedez aux opportunites adaptees a votre activite.", en: "Explore sectors and access opportunities suited to your business." },
  home_sectors_see_all: { fr: "Voir tous les secteurs", en: "See all sectors" },
  sector_construction: { fr: "Travaux & construction", en: "Works & construction" },
  sector_energy: { fr: "Energie & environnement", en: "Energy & environment" },
  sector_industry: { fr: "Industrie & maintenance", en: "Industry & maintenance" },
  sector_it: { fr: "Informatique & telecoms", en: "IT & telecoms" },
  sector_transport: { fr: "Transport & logistique", en: "Transport & logistics" },
  sector_services: { fr: "Services aux entreprises", en: "Business services" },

  home_news_eyebrow: { fr: "Actualites", en: "News" },
  home_news_title: { fr: "L'actualite des marches.", en: "Market news." },
  home_news_sub: { fr: "Reglementation, nouvelles opportunites et secteurs a suivre.", en: "Regulation, new opportunities and sectors to watch." },
  home_news_read: { fr: "Lire l'article", en: "Read article" },
  home_news_see_all: { fr: "Voir toutes les actualites", en: "See all news" },
  home_news_cat_reg: { fr: "Reglementation", en: "Regulation" },
  home_news_cat_trend: { fr: "Tendances", en: "Trends" },
  home_news_cat_opp: { fr: "Opportunites", en: "Opportunities" },
  home_news_title_reg: { fr: "Marches publics : les changements a connaitre", en: "Public procurement: the changes to know" },
  home_news_title_trend: { fr: "Les secteurs qui recherchent de nouveaux partenaires", en: "The sectors looking for new partners" },
  home_news_title_opp: { fr: "Les nouvelles consultations pres de chez vous", en: "New consultations near you" },
  mobilebar_rdv: { fr: "RDV", en: "Book" },
  mobilebar_callback: { fr: "Etre rappele", en: "Call back" },
  home_advisor_title: { fr: "Besoin d'un accompagnement personnalise ?", en: "Need personalized support?" },
  home_advisor_sub: { fr: "Nos experts vous conseillent gratuitement.", en: "Our experts advise you for free." },
  home_advisor_book: { fr: "Prendre rendez-vous", en: "Book an appointment" },
  home_who_title: { fr: "Qui sommes-nous ?", en: "Who are we?" },
  home_who_body: {
    fr: "Une equipe experte a vos cotes, jusqu'a la signature de vos premiers marches.",
    en: "An expert team by your side, through to the signature of your first contracts.",
  },
  home_who_discover: { fr: "Decouvrir Marches Direct", en: "Discover Marches Direct" },

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
  detail_location: { fr: "Localisation", en: "Location" },
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
  detail_doc_selectall: { fr: "Tout selectionner", en: "Select all" },
  detail_doc_download_selected: { fr: "Telecharger", en: "Download" },
  detail_doc_updated: { fr: "documents", en: "documents" },
  detail_ai_assist_title: { fr: "Analyse assistee", en: "Assisted analysis" },
  detail_ai_assist_desc: {
    fr: "Reperez les exigences, les dates et les pieces demandees.",
    en: "Spot requirements, dates and required documents.",
  },
  detail_ai_assist_soon: { fr: "Bientot disponible", en: "Coming soon" },
  detail_ai_assist_launch: { fr: "Lancer l'analyse du DCE", en: "Run the DCE analysis" },
  detail_back_to_listing: { fr: "Retour au marche", en: "Back to listing" },
  detail_view_dossier: { fr: "Consulter le dossier", en: "View the dossier" },

  // Sous-traitance ("chantier") detail page
  sub_badge_new: { fr: "Nouveau", en: "New" },
  sub_badge_urgent: { fr: "Urgent", en: "Urgent" },
  sub_start_date: { fr: "Demarrage prevu", en: "Planned start" },
  sub_duration: { fr: "Duree estimee", en: "Estimated duration" },
  sub_duration_months: { fr: "{n} mois", en: "{n} months" },
  sub_ordering_company: { fr: "Entreprise donneuse d'ordre", en: "Ordering company" },
  sub_trade: { fr: "Metier", en: "Trade" },
  sub_radius: { fr: "Rayon", en: "Radius" },
  sub_interested_title: { fr: "Interesse par ce chantier ?", en: "Interested in this site?" },
  sub_interested_sub: { fr: "Nos experts vous accompagnent rapidement.", en: "Our experts support you quickly." },
  sub_book_appointment: { fr: "Prendre rendez-vous", en: "Book an appointment" },
  sub_be_called_back: { fr: "Etre rappele", en: "Request a callback" },
  sub_view_full: { fr: "Voir le detail du chantier", en: "View site details" },
  sub_download_brief: { fr: "Telecharger le descriptif", en: "Download the brief" },
  sub_description_title: { fr: "Description du chantier", en: "Site description" },
  sub_facts_title: { fr: "Details fournis par la source", en: "Details from the source" },
  sub_budget_title: { fr: "Budget / Enveloppe", en: "Budget / Envelope" },
  sub_zone_title: { fr: "Zone d'intervention", en: "Coverage area" },
  sub_zone_around: { fr: "Autour de {city}", en: "Around {city}" },
  sub_docs_title: { fr: "Documents disponibles", en: "Available documents" },
  sub_docs_none: { fr: "Aucun document publie pour ce chantier pour le moment.", en: "No documents published for this site yet." },
  sub_help_title: { fr: "Besoin d'aide pour trouver le bon chantier ?", en: "Need help finding the right site?" },
  sub_help_sub: { fr: "Nos experts vous accompagnent gratuitement.", en: "Our experts help you for free." },
  sub_not_available: { fr: "Non precise par la source", en: "Not specified by the source" },
  detail_respond: { fr: "Repondre a cette opportunite", en: "Respond to this opportunity" },
  detail_save: { fr: "Sauvegarder", en: "Save" },
  detail_saved: { fr: "Enregistre", en: "Saved" },
  detail_contact_advisor: { fr: "Contacter un conseiller", en: "Contact an advisor" },
  contact_title: { fr: "Demander un renseignement personnalise", en: "Request personalised information" },
  contact_sub: {
    fr: "Laissez-nous vos coordonnees, une conseillere vous rappelle sous 24h.",
    en: "Leave your details and an advisor will call you back within 24 hours.",
  },
  contact_title_rdv: { fr: "Prendre rendez-vous", en: "Book an appointment" },
  contact_sub_rdv: {
    fr: "Choisissez un creneau avec un conseiller pour faire le point sur vos besoins.",
    en: "Pick a time with an advisor to go over what you need.",
  },
  contact_title_callback: { fr: "Etre rappele", en: "Request a callback" },
  contact_sub_callback: {
    fr: "Laissez-nous votre numero, un conseiller vous rappelle rapidement.",
    en: "Leave your number and an advisor will call you back shortly.",
  },
  contact_name: { fr: "Nom complet", en: "Full name" },
  contact_company: { fr: "Entreprise", en: "Company" },
  contact_email: { fr: "Email", en: "Email" },
  contact_phone: { fr: "Telephone", en: "Phone" },
  contact_need: { fr: "Votre besoin", en: "What you need" },
  contact_need_placeholder: {
    fr: "Decrivez brievement votre besoin ou la question que vous vous posez...",
    en: "Briefly describe what you need or your question...",
  },
  contact_submit: { fr: "Envoyer ma demande", en: "Send my request" },
  contact_submitting: { fr: "Envoi...", en: "Sending..." },
  contact_success_title: { fr: "Demande envoyee !", en: "Request sent!" },
  contact_success_body: {
    fr: "Merci, vous serez recontacte sous 24h par une conseillere.",
    en: "Thank you, an advisor will contact you within 24 hours.",
  },
  contact_error_generic: { fr: "Une erreur est survenue. Veuillez reessayer.", en: "Something went wrong. Please try again." },
  contact_re_listing: { fr: "Au sujet de :", en: "Regarding:" },
  detail_from_your_hq: { fr: "de votre siege", en: "from your HQ" },

  // Dashboard
  dash_eyebrow: { fr: "Tableau de bord", en: "Dashboard" },
  dash_greeting: { fr: "Bonjour", en: "Hello" },
  dash_my_responses: { fr: "Mes reponses", en: "My responses" },
  dash_complete_profile: { fr: "Completer mon profil", en: "Complete my profile" },
  dash_my_alerts: { fr: "Mes alertes", en: "My alerts" },
  dash_my_selection: { fr: "Ma selection", en: "My selection" },
  alerts_title: { fr: "Mes alertes", en: "My alerts" },
  alerts_sub: {
    fr: "Nouvelles opportunites, echeances et documents a renouveler.",
    en: "New opportunities, deadlines, and documents to renew.",
  },
  alerts_mark_all_read: { fr: "Tout marquer comme lu", en: "Mark all as read" },
  alerts_empty: { fr: "Aucune alerte pour le moment.", en: "No alerts yet." },
  alerts_mark_read: { fr: "Marquer comme lu", en: "Mark as read" },
  dash_profile_complete: { fr: "Profil entreprise : {pct}% complet", en: "Company profile: {pct}% complete" },
  dash_profile_pending: { fr: "Completude du profil non calculee", en: "Profile completeness not calculated yet" },
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
  admin_not_available: { fr: "Donnees non disponibles pour le moment.", en: "Data not available yet." },
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

  // About us page
  about_eyebrow: { fr: "Notre equipe", en: "Our team" },
  about_title: { fr: "Rencontrez nos experts", en: "Meet our experts" },
  about_who_title: { fr: "Qui sommes-nous ?", en: "Who are we?" },
  about_who_body: {
    fr: "MarchesDirect est une equipe motivee, experimentee et specialisee dans la veille et la reponse aux appels d'offres. Nous accompagnons les entreprises du batiment sur les parties commerciales, administratives et techniques, en France metropolitaine, DOM-TOM et Corse.",
    en: "MarchesDirect is a motivated, experienced team specialised in monitoring and responding to public tenders. We support construction companies on the commercial, administrative and technical sides, across mainland France, overseas territories and Corsica.",
  },
  about_video_intro: { fr: "Video de presentation", en: "Video introduction" },
  about_video_close: { fr: "Fermer", en: "Close" },
  about_faq_title: { fr: "Questions frequentes", en: "Frequently asked questions" },
  about_who_sub: {
    fr: "Marches Direct accompagne les entreprises sur les parties commerciales, administratives et techniques, de la veille jusqu'a la signature.",
    en: "Marches Direct supports companies on the commercial, administrative and technical sides, from monitoring through to signature.",
  },
  about_cta_title: { fr: "Parlons de votre projet.", en: "Let's talk about your project." },
  faq_eyebrow: { fr: "FAQ", en: "FAQ" },
  faq_page_title: { fr: "Questions frequentes", en: "Frequently asked questions" },
  faq_page_sub: { fr: "Les reponses aux principales questions avant de demarrer.", en: "Answers to the main questions before you get started." },
  faq_cta_title_1: { fr: "Pret a", en: "Ready to" },
  faq_cta_title_2: { fr: "gagner plus de marches ?", en: "win more contracts?" },
  faq_cta_sub: { fr: "Parlons de vos objectifs des aujourd'hui.", en: "Let's talk about your goals today." },

  // /a-propos - intro page
  intro_eligibility_title: { fr: "Services reserves aux entreprises qui ont :", en: "Services reserved for companies with:" },
  intro_eligibility_1: { fr: "+2 ans d'anciennete", en: "2+ years in business" },
  intro_eligibility_2: { fr: "Plus de 3 salaries", en: "More than 3 employees" },
  intro_eyebrow: { fr: "A propos", en: "About us" },
  intro_title_1: { fr: "Les marches ?", en: "Tenders?" },
  intro_title_2: { fr: "On vous les apporte sur un plateau.", en: "We bring them to you on a plate." },
  intro_sub: {
    fr: "Appels d'offres, marches publics et opportunites de sous-traitance adaptes a votre entreprise.",
    en: "Tenders, public procurement and subcontracting opportunities matched to your company.",
  },
  intro_bullet_1_bold: { fr: "Gagnez", en: "Save" },
  intro_bullet_1_rest: { fr: "du temps", en: "time" },
  intro_bullet_2_bold: { fr: "Augmentez", en: "Increase" },
  intro_bullet_2_rest: { fr: "votre chiffre d'affaires", en: "your revenue" },
  intro_bullet_3_bold: { fr: "Soyez accompagne", en: "Get supported" },
  intro_bullet_3_rest: { fr: "de A a Z", en: "from A to Z" },
  intro_bullet_4_bold: { fr: "Ameliorez", en: "Improve" },
  intro_bullet_4_rest: { fr: "votre taux de signature", en: "your win rate" },
  intro_stat_sources_val: { fr: "12+", en: "12+" },
  intro_stat_sources_label: { fr: "sources connectees en continu", en: "sources connected continuously" },
  intro_stat_freq_val: { fr: "2-6h", en: "2-6h" },
  intro_stat_freq_label: { fr: "frequence de collecte par source", en: "collection frequency per source" },
  intro_stat_accuracy_val: { fr: "90%", en: "90%" },
  intro_stat_accuracy_label: { fr: "seuil de precision exige du chatbot IA", en: "accuracy threshold required of the AI chatbot" },
  intro_stat_invented_val: { fr: "0", en: "0" },
  intro_stat_invented_label: { fr: "donnee inventee - tout est source", en: "invented data - everything is sourced" },
  intro_team_photo_note: { fr: "Photo d'equipe a venir.", en: "Team photo coming soon." },

  // /comment-ca-marche - 6-step process page
  process_eyebrow: { fr: "Comment ca marche", en: "How it works" },
  process_title: { fr: "Du reperage de l'opportunite jusqu'au dossier pret a deposer.", en: "From spotting the opportunity to a bid package ready to submit." },
  process_sub: {
    fr: "Un parcours simple, clair et rapide pour transformer une opportunite en dossier pret a envoyer.",
    en: "A simple, clear and fast path to turn an opportunity into a bid package ready to send.",
  },
  process_step1_title: { fr: "On surveille", en: "We monitor" },
  process_step1_body: { fr: "Nos connecteurs collectent BOAMP, PLACE, JOUE et d'autres sources publiques et privees.", en: "Our connectors collect BOAMP, PLACE, JOUE and other public and private sources." },
  process_step2_title: { fr: "On trie & qualifie", en: "We sort & qualify" },
  process_step2_body: { fr: "L'IA classe chaque opportunite par metier, CPV, distance et montant.", en: "The AI classifies each opportunity by trade, CPV, distance and amount." },
  process_step3_title: { fr: "On prepare votre dossier", en: "We prepare your file" },
  process_step3_body: { fr: "Le dossier est genere a partir de votre profil entreprise : DC1, DC2, memoire technique, BPU.", en: "The file is generated from your company profile: DC1, DC2, technical memo, BPU." },
  process_step4_title: { fr: "Vous validez", en: "You validate" },
  process_step4_body: { fr: "Vous verifiez et ajustez le dossier. Nous restons disponibles pour conseil et complements.", en: "You check and adjust the file. We remain available for advice and additions." },
  process_step5_title: { fr: "On depose", en: "We submit" },
  process_step5_body: { fr: "Nous deposons les dossiers en votre nom sur les plateformes de dematerialisation.", en: "We submit the files on your behalf on the dematerialisation platforms." },
  process_step6_title: { fr: "Vous gagnez du temps", en: "You save time" },
  process_step6_body: { fr: "Vous vous concentrez sur votre activite pendant que nous maximisons vos chances.", en: "You focus on your business while we maximise your chances." },
  process_help_title: { fr: "Besoin d'un accompagnement personnalise ?", en: "Need personalised support?" },

  // Response wizard - shared step labels
  wiz_step_opportunity: { fr: "Opportunite", en: "Opportunity" },
  wiz_step_analysis: { fr: "Analyse", en: "Analysis" },
  wiz_step_preparation: { fr: "Preparation", en: "Preparation" },
  wiz_step_validation: { fr: "Validation", en: "Validation" },

  // Step 1 - Opportunite (listing detail), public vs private wording
  wiz1_eyebrow_public: { fr: "Marche public", en: "Public procurement" },
  wiz1_eyebrow_private: { fr: "Appel d'offres prive", en: "Private tender" },
  wiz1_badge_new: { fr: "Nouveau", en: "New" },
  wiz1_badge_match: { fr: "Compatibilite elevee", en: "High compatibility" },
  wiz1_stat_location: { fr: "Localisation", en: "Location" },
  wiz1_stat_budget: { fr: "Budget estime", en: "Estimated budget" },
  wiz1_stat_deadline_public: { fr: "Echeance", en: "Deadline" },
  wiz1_stat_deadline_private: { fr: "Demarrage prevu", en: "Expected start" },
  wiz1_stat_duration: { fr: "Duree estimee", en: "Estimated duration" },
  wiz1_seeking_title: { fr: "Ce que recherche le donneur d'ordre", en: "What the buyer is looking for" },
  wiz1_why_title: { fr: "Pourquoi cette opportunite peut vous correspondre", en: "Why this opportunity could be a fit" },
  wiz1_why_1_public: { fr: "Zone d'intervention compatible", en: "Compatible working area" },
  wiz1_why_2_public: { fr: "Activite correspondant a votre metier", en: "Activity matching your trade" },
  wiz1_why_3_public: { fr: "Budget adapte a votre capacite", en: "Budget suited to your capacity" },
  wiz1_why_4_public: { fr: "Delai de reponse encore confortable", en: "Comfortable response deadline" },
  wiz1_why_1_private: { fr: "Prestations compatibles avec votre activite", en: "Services compatible with your activity" },
  wiz1_why_2_private: { fr: "Zone d'intervention adaptee", en: "Suitable working area" },
  wiz1_why_3_private: { fr: "Budget coherent avec votre capacite", en: "Budget consistent with your capacity" },
  wiz1_why_4_private: { fr: "References similaires valorisables", en: "Similar references that add value" },
  wiz1_rest_title: { fr: "Marches Direct s'occupe du reste", en: "Marches Direct takes care of the rest" },
  wiz1_rest_body_public: {
    fr: "Nous analysons le dossier, preparons les documents et construisons votre reponse. Vous serez sollicite uniquement pour les informations indispensables et la validation finale.",
    en: "We analyse the file, prepare the documents and build your response. You'll only be asked for essential information and final validation.",
  },
  wiz1_rest_body_private: {
    fr: "Nous echangeons avec le donneur d'ordre, analysons son besoin et preparons votre proposition. Vous intervenez uniquement pour vos prix et la validation finale.",
    en: "We liaise with the buyer, analyse their needs and prepare your proposal. You're only involved for your pricing and final validation.",
  },
  wiz1_original_docs_public: { fr: "Consulter les documents originaux", en: "View the original documents" },
  wiz1_original_docs_private: { fr: "Consulter le descriptif original", en: "View the original brief" },
  wiz1_cta_interested: { fr: "Cette opportunite m'interesse", en: "I'm interested in this opportunity" },
  wiz1_cta_save: { fr: "Enregistrer pour plus tard", en: "Save for later" },

  // Step 2 - Analyse
  wiz2_eyebrow: { fr: "Analyse Marches Direct", en: "Marches Direct analysis" },
  wiz2_title_public: { fr: "Cette opportunite est recommandee.", en: "This opportunity is recommended." },
  wiz2_sub_public: {
    fr: "Votre entreprise presente les principaux criteres recherches par le donneur d'ordre.",
    en: "Your company shows the main criteria the buyer is looking for.",
  },
  wiz2_title_private: { fr: "Votre entreprise peut repondre a cette opportunite.", en: "Your company can respond to this opportunity." },
  wiz2_sub_private: {
    fr: "Notre equipe a verifie la compatibilite de votre profil avec les attentes du donneur d'ordre.",
    en: "Our team checked how well your profile matches the buyer's expectations.",
  },
  wiz2_recommended: { fr: "Opportunite recommandee", en: "Recommended opportunity" },
  wiz2_check_1_public: { fr: "Votre metier correspond aux prestations", en: "Your trade matches the services" },
  wiz2_check_2_public: { fr: "Votre zone d'intervention est compatible", en: "Your working area is compatible" },
  wiz2_check_3_public: { fr: "Vos references peuvent valoriser la candidature", en: "Your references can strengthen the application" },
  wiz2_check_4_public: { fr: "Le calendrier permet de preparer une reponse solide", en: "The timeline allows for a solid response" },
  wiz2_check_1_private: { fr: "Vos prestations correspondent au besoin", en: "Your services match the need" },
  wiz2_check_2_private: { fr: "Votre zone d'intervention est compatible", en: "Your working area is compatible" },
  wiz2_check_3_private: { fr: "Vos references renforcent votre candidature", en: "Your references strengthen your application" },
  wiz2_check_4_private: { fr: "Le budget et le calendrier sont coherents", en: "The budget and timeline are consistent" },
  wiz2_network_title: { fr: "L'avantage du reseau Marches Direct", en: "The Marches Direct network advantage" },
  wiz2_network_body: {
    fr: "Cette opportunite provient de notre reseau de donneurs d'ordre prives. Notre equipe facilite les echanges et presente votre entreprise dans les meilleures conditions.",
    en: "This opportunity comes from our network of private buyers. Our team facilitates exchanges and presents your company in the best conditions.",
  },
  wiz2_network_tag_1: { fr: "Mise en relation", en: "Introduction" },
  wiz2_network_tag_2: { fr: "Echanges facilites", en: "Facilitated exchanges" },
  wiz2_network_tag_3: { fr: "Suivi personnalise", en: "Personalised follow-up" },
  wiz2_prep_title_public: { fr: "Ce que Marches Direct va preparer", en: "What Marches Direct will prepare" },
  wiz2_prep_1_public: { fr: "Analyse complete du marche", en: "Full market analysis" },
  wiz2_prep_2_public: { fr: "Documents administratifs", en: "Administrative documents" },
  wiz2_prep_3_public: { fr: "Memoire technique personnalise", en: "Personalised technical memo" },
  wiz2_prep_4_public: { fr: "Structure du bordereau de prix", en: "Pricing schedule structure" },
  wiz2_prep_5_public: { fr: "Controle final et depot", en: "Final check and submission" },
  wiz2_prep_title_private: { fr: "Ce que nous allons preparer", en: "What we're going to prepare" },
  wiz2_prep_1_private: { fr: "Presentation de votre entreprise", en: "Presentation of your company" },
  wiz2_prep_2_private: { fr: "Proposition commerciale personnalisee", en: "Personalised commercial proposal" },
  wiz2_prep_3_private: { fr: "Methodologie et planning", en: "Methodology and schedule" },
  wiz2_prep_4_private: { fr: "Chiffrage structure", en: "Structured pricing" },
  wiz2_prep_5_private: { fr: "Controle final et transmission", en: "Final check and transmission" },
  wiz2_limited_title: { fr: "Votre intervention sera limitee", en: "Your involvement will be limited" },
  wiz2_limited_body_public: {
    fr: "Nous vous demanderons uniquement les informations manquantes, la validation de vos prix et votre accord final avant le depot.",
    en: "We'll only ask you for missing information, price validation and your final approval before submission.",
  },
  wiz2_limited_body_private: {
    fr: "Nous vous demanderons uniquement les informations manquantes, vos prix et votre accord final.",
    en: "We'll only ask you for missing information, your pricing and your final approval.",
  },
  wiz2_cta_confide_public: { fr: "Confier ma candidature a Marches Direct", en: "Hand my application to Marches Direct" },
  wiz2_cta_confide_private: { fr: "Confier ma proposition a Marches Direct", en: "Hand my proposal to Marches Direct" },
  wiz2_cta_advisor_public: { fr: "Je souhaite parler a un conseiller", en: "I'd like to speak to an advisor" },
  wiz2_cta_advisor_private: { fr: "Parler a un conseiller", en: "Speak to an advisor" },

  // Step 3 - Preparation
  wiz3_eyebrow_public: { fr: "Preparation de votre candidature", en: "Preparing your application" },
  wiz3_eyebrow_private: { fr: "Preparation de votre proposition", en: "Preparing your proposal" },
  wiz3_title_public: { fr: "Marches Direct prepare votre dossier.", en: "Marches Direct is preparing your file." },
  wiz3_title_private: { fr: "Marches Direct construit votre proposition.", en: "Marches Direct is building your proposal." },
  wiz3_sub_public: {
    fr: "Suivez simplement l'avancement. Nous vous contactons uniquement lorsqu'une action est necessaire.",
    en: "Simply follow the progress. We'll only contact you when action is needed.",
  },
  wiz3_sub_private: {
    fr: "Suivez l'avancement. Nous vous sollicitons uniquement lorsqu'une decision est necessaire.",
    en: "Follow the progress. We'll only reach out when a decision is needed.",
  },
  wiz3_task_1_public: { fr: "Analyse du marche", en: "Market analysis" },
  wiz3_task_2_public: { fr: "Documents administratifs", en: "Administrative documents" },
  wiz3_task_3_public: { fr: "Memoire technique personnalise", en: "Personalised technical memo" },
  wiz3_task_4_public: { fr: "Bordereau de prix", en: "Pricing schedule" },
  wiz3_task_5_public: { fr: "Controle final et depot", en: "Final check and submission" },
  wiz3_task_1_private: { fr: "Echange avec le donneur d'ordre", en: "Exchange with the buyer" },
  wiz3_task_2_private: { fr: "Presentation de votre entreprise", en: "Presentation of your company" },
  wiz3_task_3_private: { fr: "Proposition technique", en: "Technical proposal" },
  wiz3_task_4_private: { fr: "Chiffrage et marge", en: "Pricing and margin" },
  wiz3_task_5_private: { fr: "Transmission au donneur d'ordre", en: "Transmission to the buyer" },
  wiz3_status_done_public: { fr: "Terminee", en: "Done" },
  wiz3_status_done_private: { fr: "Termine", en: "Done" },
  wiz3_status_ready_public: { fr: "Prepares", en: "Ready" },
  wiz3_status_ready_private: { fr: "Preparee", en: "Ready" },
  wiz3_status_progress_public: { fr: "En cours de preparation", en: "In progress" },
  wiz3_status_progress_private: { fr: "En cours de redaction", en: "Being drafted" },
  wiz3_status_waiting_public: { fr: "En attente de vos informations", en: "Awaiting your information" },
  wiz3_status_waiting_private: { fr: "En attente de vos prix", en: "Awaiting your pricing" },
  wiz3_status_upcoming: { fr: "A venir", en: "Upcoming" },
  wiz3_progress_public: { fr: "Dossier prepare a", en: "File ready" },
  wiz3_progress_private: { fr: "Proposition preparee a", en: "Proposal ready" },
  wiz3_action_title: { fr: "Une action est necessaire", en: "Action needed" },
  wiz3_action_body_public: { fr: "Indiquez-nous vos prix pour finaliser la candidature.", en: "Tell us your pricing to finalise the application." },
  wiz3_action_body_private: { fr: "Transmettez vos prix et votre marge minimale pour finaliser la proposition.", en: "Send us your pricing and minimum margin to finalise the proposal." },
  wiz3_action_cta_public: { fr: "Transmettre mes prix", en: "Send my pricing" },
  wiz3_action_cta_private: { fr: "Renseigner mes prix", en: "Enter my pricing" },
  wiz3_action_time: { fr: "Temps estime : 5 minutes", en: "Estimated time: 5 minutes" },
  wiz3_advisor_label_public: { fr: "Votre conseiller", en: "Your advisor" },
  wiz3_advisor_label_private: { fr: "Votre conseillere", en: "Your advisor" },
  wiz3_advisor_role_public: { fr: "Chargee de votre candidature", en: "In charge of your application" },
  wiz3_advisor_role_private: { fr: "Chargee de la mise en relation", en: "In charge of the introduction" },
  wiz3_advisor_cta: { fr: "Contacter ma conseillere", en: "Contact my advisor" },
  wiz3_footer_public: {
    fr: "Vous n'avez aucun document technique a telecharger. Marches Direct s'occupe de la preparation.",
    en: "You have no technical documents to upload. Marches Direct handles the preparation.",
  },
  wiz3_footer_private: {
    fr: "Marches Direct centralise les echanges et prepare la proposition pour vous.",
    en: "Marches Direct centralises the exchanges and prepares the proposal for you.",
  },

  // Step 4 - Validation
  wiz4_eyebrow: { fr: "Validation finale", en: "Final validation" },
  wiz4_title_public: { fr: "Votre candidature est prete.", en: "Your application is ready." },
  wiz4_title_private: { fr: "Votre proposition est prete.", en: "Your proposal is ready." },
  wiz4_sub_public: {
    fr: "Marches Direct a prepare et verifie votre dossier. Il ne reste plus qu'a valider les derniers elements.",
    en: "Marches Direct has prepared and checked your file. All that's left is to validate the final details.",
  },
  wiz4_sub_private: {
    fr: "Marches Direct a prepare et verifie votre reponse. Il ne reste plus qu'a valider les derniers elements.",
    en: "Marches Direct has prepared and checked your response. All that's left is to validate the final details.",
  },
  wiz4_ready_badge_public: { fr: "Dossier pret", en: "File ready" },
  wiz4_ready_badge_private: { fr: "Proposition prete", en: "Proposal ready" },
  wiz4_check_1_public: { fr: "Documents administratifs verifies", en: "Administrative documents checked" },
  wiz4_check_2_public: { fr: "Memoire technique finalise", en: "Technical memo finalised" },
  wiz4_check_3_public: { fr: "Prix renseignes et controles", en: "Pricing entered and checked" },
  wiz4_check_4_public: { fr: "Dossier conforme au format demande", en: "File compliant with the required format" },
  wiz4_check_5_public: { fr: "Date limite respectee", en: "Deadline respected" },
  wiz4_check_1_private: { fr: "Presentation de l'entreprise finalisee", en: "Company presentation finalised" },
  wiz4_check_2_private: { fr: "Proposition technique personnalisee", en: "Personalised technical proposal" },
  wiz4_check_3_private: { fr: "Prix et marge renseignes", en: "Pricing and margin entered" },
  wiz4_check_4_private: { fr: "Planning d'intervention confirme", en: "Work schedule confirmed" },
  wiz4_check_5_private: { fr: "Coordonnees du donneur d'ordre verifiees", en: "Buyer's contact details verified" },
  wiz4_deposit_before: { fr: "Depot prevu avant le", en: "Submission due by" },
  wiz4_transmission_today: { fr: "Transmission prevue aujourd'hui", en: "Transmission scheduled for today" },
  wiz4_validation_title: { fr: "Votre validation", en: "Your validation" },
  wiz4_toggle_1: { fr: "Je confirme les informations de mon entreprise", en: "I confirm my company's information" },
  wiz4_toggle_2_public: { fr: "Je valide les prix presentes", en: "I approve the pricing shown" },
  wiz4_toggle_2_private: { fr: "Je valide les prix et la marge presentes", en: "I approve the pricing and margin shown" },
  wiz4_toggle_3_public: { fr: "J'autorise Marches Direct a deposer la candidature", en: "I authorise Marches Direct to submit the application" },
  wiz4_toggle_3_private: { fr: "J'autorise Marches Direct a transmettre la proposition", en: "I authorise Marches Direct to send the proposal" },
  wiz4_after_title: { fr: "Apres votre autorisation", en: "After your approval" },
  wiz4_after_body_public: {
    fr: "Marches Direct transmettra le dossier sur la plateforme du donneur d'ordre. Vous recevrez une confirmation de depot dans votre tableau de bord.",
    en: "Marches Direct will submit the file on the buyer's platform. You'll receive a submission confirmation in your dashboard.",
  },
  wiz4_after_body_private: {
    fr: "Marches Direct transmettra votre proposition au donneur d'ordre prive et assurera le suivi de la mise en relation. Vous serez informe de chaque retour dans votre tableau de bord.",
    en: "Marches Direct will send your proposal to the private buyer and follow up on the introduction. You'll be informed of every update in your dashboard.",
  },
  wiz4_cta_validate_public: { fr: "Valider et autoriser le depot", en: "Validate and authorise submission" },
  wiz4_cta_validate_private: { fr: "Valider et transmettre ma proposition", en: "Validate and send my proposal" },
  wiz4_cta_modify: { fr: "Demander une derniere modification", en: "Request a final change" },
  wiz4_footer_public: { fr: "Vous conservez la decision finale. Aucun dossier n'est depose sans votre accord.", en: "You keep the final decision. No file is submitted without your approval." },
  wiz4_footer_private: { fr: "Vous restez libre de negocier et d'accepter les conditions proposees.", en: "You remain free to negotiate and accept the proposed terms." },

  // /notre-equipe
  team_eyebrow: { fr: "Notre equipe", en: "Our team" },
  team_page_title: { fr: "Rencontrez nos experts", en: "Meet our experts" },
  team_page_sub: {
    fr: "Une equipe engagee, experimentee et specialisee dans la veille et la reponse aux appels d'offres.",
    en: "A committed, experienced team specialised in monitoring and responding to tenders.",
  },
};

export const teamMembers = [
  { name: "Toupain Rodolphe", role: { fr: "President", en: "President" }, photo: "", videoUrl: "" },
  { name: "Charline Goessen", role: { fr: "Assistante de Direction", en: "Executive Assistant" }, photo: "", videoUrl: "" },
  { name: "Toupain Anthony", role: { fr: "Manager General & Designer", en: "General Manager & Designer" }, photo: "", videoUrl: "" },
  { name: "Garance Marchal", role: { fr: "Community Manageur", en: "Community Manager" }, photo: "", videoUrl: "" },
];

export const faqItems = [
  {
    q: { fr: "Pourquoi choisir MarchesDirect pour repondre a nos appels d'offres ?", en: "Why choose MarchesDirect to respond to our tenders?" },
    a: {
      fr: "Notre equipe combine une veille automatisee des marches publics et prives avec un accompagnement humain sur chaque dossier, pour maximiser vos chances de remporter un marche sans y passer vos journees.",
      en: "Our team combines automated public and private tender monitoring with hands-on support on every file, to maximise your chances of winning a contract without spending your days on it.",
    },
  },
  {
    q: { fr: "Comment MarchesDirect protege-t-elle la confidentialite de nos informations ?", en: "How does MarchesDirect protect the confidentiality of our information?" },
    a: {
      fr: "Vos documents et donnees d'entreprise restent strictement confidentiels et ne sont utilises que pour la preparation de vos reponses aux appels d'offres.",
      en: "Your company documents and data remain strictly confidential and are only used to prepare your tender responses.",
    },
  },
  {
    q: { fr: "Comment MarchesDirect s'assure-t-elle que nos propositions sont soumises a temps ?", en: "How does MarchesDirect make sure our proposals are submitted on time?" },
    a: {
      fr: "Chaque dossier suit un parcours avec etapes et echeances suivies (Dossier, Analyse, Reponse, Envoi), avec des alertes avant chaque date limite.",
      en: "Every file follows a tracked step-by-step path (Dossier, Analysis, Response, Sending), with alerts ahead of every deadline.",
    },
  },
  {
    q: { fr: "Qu'est-ce qui differencie MarchesDirect des autres plateformes ?", en: "What sets MarchesDirect apart from other platforms?" },
    a: {
      fr: "La combinaison d'une plateforme technique (veille, classification IA) et d'un accompagnement humain reel a chaque etape de votre reponse.",
      en: "The combination of a technical platform (monitoring, AI classification) and real human support at every step of your response.",
    },
  },
];

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
