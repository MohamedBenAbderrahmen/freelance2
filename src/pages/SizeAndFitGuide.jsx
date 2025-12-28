import { useState } from 'react';
import './sizeAndFitGuide.css';

// ========== SIZE AND FIT GUIDE COMPONENT ==========
// Detailed size guide page like Streetwear with visual size charts
export default function SizeAndFitGuide() {
  // ========== STATE MANAGEMENT ==========
  // Track selected product type
  const [selectedType, setSelectedType] = useState('shirts');
  // Track selected size
  const [selectedSize, setSelectedSize] = useState('M');

  // ========== SIZE GUIDE DATA ==========
  const sizeGuides = {
    shirts: {
      title: '👕 Shirts & Tops Size Guide',
      description: 'Find your perfect fit with our comprehensive shirt sizing guide',
      measurements: [
        { label: 'XS', chest: '32"', length: '26"', shoulders: '16"', fit: 'Slim' },
        { label: 'S', chest: '34"', length: '27"', shoulders: '17"', fit: 'Slim' },
        { label: 'M', chest: '36"', length: '28"', shoulders: '18"', fit: 'Regular' },
        { label: 'L', chest: '38"', length: '29"', shoulders: '19"', fit: 'Regular' },
        { label: 'XL', chest: '40"', length: '30"', shoulders: '20"', fit: 'Regular' },
        { label: 'XXL', chest: '42"', length: '31"', shoulders: '21"', fit: 'Loose' },
      ],
      measurementInstructions: {
        chest: 'Wrap tape around the fullest part of your chest, keeping it parallel to the ground. Stand straight with arms relaxed.',
        length: 'Measure from the top of your shoulder (at the base of neck) down to your desired hem length.',
        shoulders: 'Measure across the back from shoulder point to shoulder point.',
      },
      fitDescription: 'Regular fit shirts provide comfort with a relaxed silhouette. Slim fit for a more tailored look.',
      modelSize: 'Model is wearing size Large',
    },
    pants: {
      title: '👖 Pants & Bottoms Size Guide',
      description: 'Get the perfect fit with our detailed pants sizing',
      measurements: [
        { label: '28', waist: '28"', inseam: '29"', rise: '10"', fit: 'Slim' },
        { label: '30', waist: '30"', inseam: '30"', rise: '11"', fit: 'Slim' },
        { label: '32', waist: '32"', inseam: '31"', rise: '11"', fit: 'Regular' },
        { label: '34', waist: '34"', inseam: '32"', rise: '12"', fit: 'Regular' },
        { label: '36', waist: '36"', inseam: '33"', rise: '12"', fit: 'Relaxed' },
        { label: '38', waist: '38"', inseam: '34"', rise: '13"', fit: 'Relaxed' },
      ],
      measurementInstructions: {
        waist: 'Measure around your natural waistline (smallest part of your waist) with tape snug but not tight.',
        inseam: 'Measure from your inner thigh to your ankle on the inside of your leg. Wear shoes you plan to wear.',
        rise: 'Measure from the top of the waistband to the crotch seam.',
      },
      fitDescription: 'Slim fit for a modern tapered look. Regular fit for everyday comfort. Relaxed fit for maximum comfort.',
      modelSize: 'Model is wearing size 32',
    },
    dresses: {
      title: '👗 Dresses Size Guide',
      description: 'Find your perfect dress size with detailed measurements',
      measurements: [
        { label: 'XS', bust: '32"', waist: '24"', hips: '34"', length: '42"', fit: 'Tight' },
        { label: 'S', bust: '34"', waist: '26"', hips: '36"', length: '43"', fit: 'Fitted' },
        { label: 'M', bust: '36"', waist: '28"', hips: '38"', length: '44"', fit: 'Fitted' },
        { label: 'L', bust: '38"', waist: '30"', hips: '40"', length: '45"', fit: 'Fitted' },
        { label: 'XL', bust: '40"', waist: '32"', hips: '42"', length: '46"', fit: 'Relaxed' },
        { label: 'XXL', bust: '42"', waist: '34"', hips: '44"', length: '47"', fit: 'Relaxed' },
      ],
      measurementInstructions: {
        bust: 'Measure across the fullest part of your chest with arms at sides.',
        waist: 'Measure around the smallest part of your waist.',
        hips: 'Measure around the fullest part of your hips (about 8 inches below waist).',
        length: 'Measure from shoulder to where you want the dress to end.',
      },
      fitDescription: 'Fitted dresses hug your curves. Relaxed fit dresses flow more loosely for comfort.',
      modelSize: 'Model is wearing size Small',
    },
    hoodies: {
      title: '🧥 Hoodies & Sweatshirts Size Guide',
      description: 'Comfortable oversized fit for casual wear',
      measurements: [
        { label: 'S', chest: '36"', length: '26"', shoulders: '18"', sleeves: '32"', fit: 'Regular' },
        { label: 'M', chest: '38"', length: '27"', shoulders: '19"', sleeves: '33"', fit: 'Regular' },
        { label: 'L', chest: '40"', length: '28"', shoulders: '20"', sleeves: '34"', fit: 'Oversized' },
        { label: 'XL', chest: '42"', length: '29"', shoulders: '21"', sleeves: '35"', fit: 'Oversized' },
        { label: '2XL', chest: '44"', length: '30"', shoulders: '22"', sleeves: '36"', fit: 'Oversized' },
        { label: '3XL', chest: '46"', length: '31"', shoulders: '23"', sleeves: '37"', fit: 'Oversized' },
      ],
      measurementInstructions: {
        chest: 'Measure around the fullest part of the chest with the hoodie laid flat.',
        length: 'Measure from the top of the shoulder seam straight down the center back to the hem.',
        shoulders: 'Measure straight across the back from shoulder seam to shoulder seam.',
        sleeves: 'Measure from the center back neck down the shoulder and along the arm to the wrist.',
      },
      fitDescription: 'Hoodies are designed with a comfortable, slightly oversized fit. Great for layering and casual wear.',
      modelSize: 'Model is wearing size Large',
    },
  };

  const currentGuide = sizeGuides[selectedType];

  return (
    <section className="size-fit-guide-section">
      <div className="size-fit-container">

        {/* ========== PAGE HEADER ========== */}
        <div className="guide-page-header">
          <h1>📏 Size & Fit Guide</h1>
          <p>Get the perfect fit. Measure carefully using our detailed guide below.</p>
        </div>

        {/* ========== PRODUCT TYPE SELECTOR ========== */}
        <div className="product-type-selector">
          <div className="type-buttons">
            {Object.keys(sizeGuides).map((type) => (
              <button
                key={type}
                className={`type-btn ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type === 'shirts' && '👕 Shirts'}
                {type === 'pants' && '👖 Pants'}
                {type === 'dresses' && '👗 Dresses'}
                {type === 'hoodies' && '🧥 Hoodies'}
              </button>
            ))}
          </div>
        </div>

        {/* ========== SIZE GUIDE CONTENT ========== */}
        <div className="size-guide-content">

          {/* HEADER */}
          <div className="guide-header">
            <h2>{currentGuide.title}</h2>
            <p>{currentGuide.description}</p>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="guide-layout">

            {/* LEFT - SIZE CHART TABLE */}
            <div className="size-chart-section">
              <h3>📊 Size Chart</h3>

              <div className="size-chart-wrapper">
                <table className="size-chart-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      {selectedType === 'shirts' && (
                        <>
                          <th>Chest</th>
                          <th>Length</th>
                          <th>Shoulders</th>
                          <th>Fit</th>
                        </>
                      )}
                      {selectedType === 'pants' && (
                        <>
                          <th>Waist</th>
                          <th>Inseam</th>
                          <th>Rise</th>
                          <th>Fit</th>
                        </>
                      )}
                      {selectedType === 'dresses' && (
                        <>
                          <th>Bust</th>
                          <th>Waist</th>
                          <th>Hips</th>
                          <th>Length</th>
                          <th>Fit</th>
                        </>
                      )}
                      {selectedType === 'hoodies' && (
                        <>
                          <th>Chest</th>
                          <th>Length</th>
                          <th>Shoulders</th>
                          <th>Sleeves</th>
                          <th>Fit</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currentGuide.measurements.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`size-row ${selectedSize === row.label ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(row.label)}
                      >
                        <td className="size-label">{row.label}</td>
                        {selectedType === 'shirts' && (
                          <>
                            <td>{row.chest}</td>
                            <td>{row.length}</td>
                            <td>{row.shoulders}</td>
                            <td>{row.fit}</td>
                          </>
                        )}
                        {selectedType === 'pants' && (
                          <>
                            <td>{row.waist}</td>
                            <td>{row.inseam}</td>
                            <td>{row.rise}</td>
                            <td>{row.fit}</td>
                          </>
                        )}
                        {selectedType === 'dresses' && (
                          <>
                            <td>{row.bust}</td>
                            <td>{row.waist}</td>
                            <td>{row.hips}</td>
                            <td>{row.length}</td>
                            <td>{row.fit}</td>
                          </>
                        )}
                        {selectedType === 'hoodies' && (
                          <>
                            <td>{row.chest}</td>
                            <td>{row.length}</td>
                            <td>{row.shoulders}</td>
                            <td>{row.sleeves}</td>
                            <td>{row.fit}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="chart-note">Click on a size to see details</p>
            </div>

            {/* RIGHT - MEASUREMENT GUIDE */}
            <div className="measurement-guide-section">
              <h3>📐 How to Measure</h3>

              <div className="measurement-cards">
                {Object.entries(currentGuide.measurementInstructions).map(([key, instruction], idx) => (
                  <div key={idx} className="measurement-card">
                    <div className="measurement-icon">
                      {key === 'chest' && '📐'}
                      {key === 'length' && '📏'}
                      {key === 'shoulders' && '↔️'}
                      {key === 'waist' && '📍'}
                      {key === 'inseam' && '📏'}
                      {key === 'rise' && '↕️'}
                      {key === 'bust' && '📐'}
                      {key === 'hips' && '⭕'}
                      {key === 'sleeves' && '🤖'}
                    </div>
                    <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                    <p>{instruction}</p>
                  </div>
                ))}
              </div>

              {/* FIT INFORMATION */}
              <div className="fit-info-card">
                <h4>💡 About the Fit</h4>
                <p>{currentGuide.fitDescription}</p>
                <p className="model-info">{currentGuide.modelSize}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== GENERAL TIPS SECTION ========== */}
        <div className="general-tips-section">
          <h2>💡 General Sizing Tips</h2>

          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <h3>Be Accurate</h3>
              <p>Use a flexible measuring tape and keep it parallel to the ground for accurate measurements.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">👕</div>
              <h3>Measure Correctly</h3>
              <p>For the most accurate results, measure over light clothing or with minimal clothing.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">📐</div>
              <h3>Check Twice</h3>
              <p>Always double-check your measurements to ensure accuracy before selecting your size.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">🔄</div>
              <h3>Compare Items</h3>
              <p>Different styles may fit differently. Always compare measurements, not just size labels.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">❌</div>
              <h3>Avoid Pinching</h3>
              <p>The tape should be snug on your body but not tight. Pinching can give incorrect measurements.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>If something doesn't fit, we offer easy 14-day returns for peace of mind.</p>
            </div>
          </div>
        </div>

        {/* ========== FIT TYPES EXPLANATION ========== */}
        <div className="fit-types-section">
          <h2>👔 Understanding Fit Types</h2>

          <div className="fit-types-grid">
            <div className="fit-type-card">
              <div className="fit-type-visual tight-fit"></div>
              <h3>Tight Fit</h3>
              <p>Hugs the body closely. Great for a tailored, flattering look. Movement may be slightly restricted.</p>
            </div>

            <div className="fit-type-card">
              <div className="fit-type-visual slim-fit"></div>
              <h3>Slim Fit</h3>
              <p>Follows body contours without being too tight. Perfect for a modern, stylish appearance.</p>
            </div>

            <div className="fit-type-card">
              <div className="fit-type-visual regular-fit"></div>
              <h3>Regular Fit</h3>
              <p>Classic comfortable fit with room for movement. Versatile for most body types.</p>
            </div>

            <div className="fit-type-card">
              <div className="fit-type-visual relaxed-fit"></div>
              <h3>Relaxed Fit</h3>
              <p>Loose and comfortable with plenty of room. Perfect for casual, laid-back style.</p>
            </div>

            <div className="fit-type-card">
              <div className="fit-type-visual oversized-fit"></div>
              <h3>Oversized Fit</h3>
              <p>Extra roomy and comfortable. Trendy and perfect for streetwear and casual wear.</p>
            </div>

            <div className="fit-type-card">
              <div className="fit-type-visual baggy-fit"></div>
              <h3>Baggy Fit</h3>
              <p>Maximum room and comfort. Bold and confident style. Great for layering.</p>
            </div>
          </div>
        </div>

        {/* ========== NEED HELP SECTION ========== */}
        <div className="help-section">
          <h2>❓ Still Need Help?</h2>
          <p>Contact our customer service team - we're here to help!</p>
          <div className="help-buttons">
            <button className="help-btn email-btn">📧 Email Us</button>
            <button className="help-btn chat-btn">💬 Live Chat</button>
            <button className="help-btn phone-btn">📞 Call Us</button>
          </div>
        </div>
      </div>
    </section>
  );
}