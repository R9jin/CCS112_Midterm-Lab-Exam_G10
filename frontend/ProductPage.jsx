import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Spinner, Alert, Modal, Form } from "react-bootstrap";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const api = "http://127.0.0.1:8000/api/products";

  // Load all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(api);
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${api}/${id}`);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  // Open modal for Add/Edit
  const handleModal = (product = null) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Save Product (Add or Update)
  const saveProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      price: form.price.value,
      stock: form.stock.value,
      description: form.description.value,
    };

    try {
      if (currentProduct) {
        await axios.put(`${api}/${currentProduct.id}`, data);
      } else {
        await axios.post(api, data);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      setError("Failed to save product.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Product Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={() => handleModal()}>
          + Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading products...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>₱{Number(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.description}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleModal(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={saveProduct}>
          <Modal.Header closeButton>
            <Modal.Title>
              {currentProduct ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                defaultValue={currentProduct?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                defaultValue={currentProduct?.price || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                defaultValue={currentProduct?.stock || ""}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                defaultValue={currentProduct?.description || ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
