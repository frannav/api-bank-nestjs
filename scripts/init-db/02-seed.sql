-- Insert test banks
INSERT INTO accounts (id, account_number, iban, balance, owner_name, bank_id)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '11112222', 'ES9121000418450200051332', 5000.00, 'Luke Skywalker', 'BBVA'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '33334444', 'ES7921000813610123456789', 3000.00, 'Darth Vader', 'SANTANDER');

-- Insert test cards (active and inactive)
INSERT INTO cards (id, card_number, pin, card_type, account_id, is_active, daily_limit, credit_limit, expiration_date)
VALUES 
    -- Active cards (existing)
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '4532015112830366', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewqxrQQMLxQxj7.q', 'DEBIT', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', true, 1000.00, null, '2025-12-31 23:59:59'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', '4532015112830367', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewqxrQQMLxQxj7.q', 'CREDIT', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', true, 2000.00, 5000.00, '2025-12-31 23:59:59'),
    
    -- Inactive cards (new)
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', '4532015112830368', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewqxrQQMLxQxj7.q', 'DEBIT', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', false, 1000.00, null, '2025-12-31 23:59:59'),
    ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', '4532015112830369', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewqxrQQMLxQxj7.q', 'CREDIT', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', false, 2000.00, 3000.00, '2025-12-31 23:59:59'),
    ('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', '4532015112830370', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewqxrQQMLxQxj7.q', 'DEBIT', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', false, 500.00, null, '2025-12-31 23:59:59');

-- Insert some sample transactions
INSERT INTO transactions (id, type, amount, account_id, card_id, description)
VALUES 
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'DEPOSIT', 1000.00, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Initial deposit'),
    ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'WITHDRAWAL', 200.00, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'ATM withdrawal'),
    ('a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'TRANSFER_OUT', 500.00, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', null, 'Transfer to Luke'),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a88', 'TRANSFER_IN', 500.00, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', null, 'Transfer from Vader'),
    ('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a99', 'COMMISSION', 2.50, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', null, 'Transfer commission');
